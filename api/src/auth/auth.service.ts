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
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(signInDto: LoginDto): Promise<Tokens> {
    // const user = await this.userService.getUserBy({ email });
    // if (!user) throw new UnauthorizedException();
    // const role = await this.userService.getRole(user.id);
    const user = await this.validate(signInDto.email, signInDto.password);

    const payload: any = { user, role: user.role };
    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async verifyAccessToken(token: string): Promise<Payload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET_KEY'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getVerificationToken(email: string): Promise<string> {
    return await this.jwtService.signAsync(
      { email },
      {
        secret: this.configService.get('jwt.verify_secret'),
        expiresIn: this.configService.get('jwt.verify_expiration'),
      },
    );
  }

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

  async validateAccount(email: string) {
    this.userService.validateUser({ email });
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
    const user = await this.userService.getUserBy({ id });
    if (!user) throw new UnauthorizedException('Acceso denegado');

    const role = await this.userService.getRole(id);
    const savedToken = await this.userService.getRefreshToken(id);
    if (!savedToken) throw new UnauthorizedException('Acceso denegado');

    const refreshTokenMatches = await verifyData(savedToken, refreshToken);
    if (!refreshTokenMatches)
      throw new UnauthorizedException('Acceso denegado');

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

  separateName(fullName: string) {
    const separate = fullName.split(' ');
    const name = separate[0];
    const lastName = separate[1];
    return {
      name,
      lastName,
    };
  }

  separateEmail(email: string) {
    const [username] = email.split('@');
    return username;
  }

  async googgleRegister(data: { name: string; email: string }) {
    const { name, lastName } = this.separateName(data.name);
    const info = {
      username: this.separateEmail(data.email),
      firstName: name,
      lastName: lastName,
      email: data.email,
      numberPhone: '+100000000000',
      password: 'google.account89',
      provider: 'google.account89',
      birthday: new Date('1900-01-01'),
    };
    const newUser = await this.userService.createUser(info);
    if (!newUser) throw new ForbiddenException('Error al crear al usuario');
    return newUser;
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserBy({ email });
    if (!user) throw new BadRequestException('El usuario no existe');

    const hash = await this.userService.getUserPassword(user.id);
    const passMatch = await this.hashService.compareHash(hash, password);
    if (!passMatch) throw new BadRequestException('Credenciales incorrectas');
    return user;
  }
}
