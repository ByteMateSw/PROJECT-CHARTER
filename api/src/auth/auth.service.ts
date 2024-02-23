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
import { Payload, Tokens } from './jwt/token.type';
import { User } from '../user/user.entity';
import { ConfigService } from '@nestjs/config';
import { hashData, verifyData } from '../utils/tools/hash';
import { setCookie } from '../utils/tools/cookies';
import { Response } from 'express';
import { refreshCookieName } from '../config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(email: string): Promise<Tokens> {
    const user = await this.userService.getUser({ email });
    if (!user) throw new UnauthorizedException();
    const role = await this.userService.getRole(user.id);

    const payload: Payload = { sub: user.id, email: user.email, role };
    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

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

  async refreshTokens(id: number, refreshToken: string): Promise<Tokens> {
    const user = await this.userService.getUser({ id });
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

  async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await hashData(refreshToken);
    await this.userService.updateRefreshToken(id, hashedRefreshToken);
  }

  setRefreshToken(refreshToken: string, res: Response) {
    setCookie(refreshCookieName, refreshToken, res, {
      httpOnly: true,
      secure: this.configService.get('jwt.secure'),
      sameSite: this.configService.get('jwt.samesite'),
      path: '/auth/refresh',
      maxAge: this.configService.get('jwt.maxAge'),
    });
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const newUser = await this.userService.createUser(registerDto);
    if (!newUser) throw new ForbiddenException('Error al crear al usuario');
    return newUser;
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.getUser({ email });
    if (!user) throw new BadRequestException('Credenciales incorrectas');

    const hash = await this.userService.getUserPassword(user.id);
    const passMatch = await this.hashService.compareHash(hash, password);
    if (!passMatch) throw new BadRequestException('Credenciales incorrectas');
    return user;
  }
}
