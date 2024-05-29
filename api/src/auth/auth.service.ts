import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { HashService } from './hash.service';
import { Payload, Tokens, VerifyToken } from './jwt/token.type';
import { User } from '../user/user.entity';
import { ConfigService } from '@nestjs/config';
import { hashData, verifyData } from '../utils/tools/hash';
import { setCookie } from '../utils/tools/cookies';
import { Response } from 'express';
import { refreshCookieName } from '../config/jwt.config';

/**
 * Service responsible for handling authentication-related operations.
 */
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Logs in a user with the provided email.
   * @param email - The email of the user.
   * @returns A promise that resolves to the generated access and refresh tokens.
   * @throws UnauthorizedException if the user is not found.
   */
  async login(email: string): Promise<Tokens> {
    const user = await this.userService.getUserBy({ email });
    if (!user) throw new UnauthorizedException();
    const role = await this.userService.getRole(user.id);

    const payload: any = { user, role };
    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  /**
   * Generates a verification token for the provided email.
   * @param email - The email for which to generate the verification token.
   * @returns A promise that resolves to the generated verification token.
   */
  async getVerificationToken(email: string): Promise<string> {
    return await this.jwtService.signAsync(
      { email },
      {
        secret: this.configService.get('jwt.verify_secret'),
        expiresIn: this.configService.get('jwt.verify_expiration'),
      },
    );
  }

  /**
   * Verifies the provided verification token.
   * @param token - The verification token to verify.
   * @returns A promise that resolves to the verified token payload.
   * @throws BadRequestException if the token is invalid.
   */
  async verifyVerificationToken(token: string): Promise<VerifyToken> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('jwt.verify_secret'),
        ignoreExpiration: false,
      });
    } catch (error) {
      throw new BadRequestException('Error al ingresar el token');
    }
  }

  /**
   * Validates the user account with the provided email.
   * @param email - The email of the user account to validate.
   */
  async validateAccount(email: string) {
    this.userService.validateUser({ email });
  }

  /**
   * Generates access and refresh tokens for the provided payload.
   * @param payload - The payload to sign into tokens.
   * @returns A promise that resolves to the generated access and refresh tokens.
   */
  async getTokens(payload: Payload): Promise<Tokens> {
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('jwt.access_secret'),
        expiresIn: this.configService.get('jwt.access_expiration'),
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('jwt.refresh_secret'),
        expiresIn: this.configService.get('jwt.refresh_expiration'),
      }),
    };
  }

  /**
   * Refreshes the access and refresh tokens for the user with the provided ID.
   * @param id - The ID of the user.
   * @param refreshToken - The refresh token to verify and refresh.
   * @returns A promise that resolves to the generated access and refresh tokens.
   * @throws UnauthorizedException if the user or refresh token is invalid.
   */
  async refreshTokens(id: number, refreshToken: string): Promise<Tokens> {
    const user = await this.userService.getUserBy({ id });
    if (!user) throw new UnauthorizedException('Accesso denegado');

    const role = await this.userService.getRole(id);
    const savedToken = await this.userService.getRefreshToken(id);
    if (!savedToken) throw new UnauthorizedException('Accesso denegado');

    const refreshTokenMatches = await verifyData(savedToken, refreshToken);
    if (!refreshTokenMatches)
      throw new UnauthorizedException('Accesso denegado');

    const tokens = await this.getTokens({
      sub: user.id,
      email: user.email,
      role,
    });
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  /**
   * Updates the refresh token for the user with the provided ID.
   * @param id - The ID of the user.
   * @param refreshToken - The new refresh token.
   */
  async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await hashData(refreshToken);
    await this.userService.updateRefreshToken(id, hashedRefreshToken);
  }

  /**
   * Sets the refresh token as a cookie in the provided response object.
   * @param refreshToken - The refresh token to set as a cookie.
   * @param res - The response object.
   */
  setRefreshToken(refreshToken: string, res: Response) {
    setCookie(refreshCookieName, refreshToken, res, {
      httpOnly: true,
      secure: this.configService.get('jwt.secure'),
      sameSite: this.configService.get('jwt.samesite'),
      path: '/auth/refresh',
      maxAge: this.configService.get('jwt.maxAge'),
    });
  }

  /**
   * Registers a new user with the provided registration data.
   * @param registerDto - The registration data of the user.
   * @returns A promise that resolves to the created user.
   * @throws ForbiddenException if there is an error creating the user.
   */
  async register(registerDto: RegisterDto): Promise<User> {
    const newUser = await this.userService.createUser(registerDto);
    if (!newUser) throw new ForbiddenException('Error al crear al usuario');
    return newUser;
  }

  /**
   * Validates the user credentials with the provided email and password.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A promise that resolves to the validated user.
   * @throws BadRequestException if the credentials are incorrect.
   */
  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserBy({ email });
    if (!user) throw new BadRequestException('El usuario no existe');

    const hash = await this.userService.getUserPassword(user.id);
    const passMatch = await this.hashService.compareHash(hash, password);
    if (!passMatch) throw new BadRequestException('Credenciales incorrectas');
    return user;
  }
}
