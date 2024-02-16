import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ToSGuard } from './ToS/ToS.guard';
import { HashPipe } from '../utils/pipes/hash.pipe';
import { Response } from 'express';
import { LocalAuthGuard } from './local/local-auth.guard';
import { AccessToken, Tokens } from './jwt/token.type';
import { ResponseMessage } from '../utils/types/message.type';
import { RefreshTokenCookie } from './jwt/refresh.param';
import { RefreshTokenGuard } from './jwt/refresh.guard';
import { UserParamID } from './jwt/user.param';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(201)
  @Post('register')
  async registerUser(
    @Body(HashPipe) registerDto: RegisterDto,
  ): Promise<ResponseMessage> {
    const newUser = await this.authService.register(registerDto);
    return newUser
      ? { message: 'El usuario a sido creado con éxito' }
      : { message: 'No se pudo crear el usuario' };
  }

  @UseGuards(LocalAuthGuard, ToSGuard)
  @Post('login')
  async loginUser(
    @Body() signInDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessToken> {
    const tokens: Tokens = await this.authService.login(signInDto.email);
    this.authService.setRefreshToken(tokens.refresh_token, res);
    return { access_token: tokens.access_token };
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(
    @RefreshTokenCookie() refreshToken: string,
    @UserParamID() id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessToken> {
    const tokens = await this.authService.refreshTokens(id, refreshToken);
    this.authService.setRefreshToken(tokens.refresh_token, res);
    return { access_token: tokens.access_token };
  }
}
