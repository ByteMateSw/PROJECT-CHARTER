import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { HashPasswordPipe } from '../utils/pipes/hash.pipe';
import { Response } from 'express';
import { LocalAuthGuard } from './local/local-auth.guard';
import { AccessToken, Tokens } from './jwt/token.type';
import { ResponseMessage } from '../utils/types/functions.type';
import { RefreshTokenCookie } from './jwt/refresh.param';
import { RefreshTokenGuard } from './jwt/refresh.guard';
import { UserParamID } from '../utils/params/user.param';
import { MailerService } from '../mailer/mailer.service';

/**
 * Controller responsible for handling authentication-related requests.
 */
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailerService: MailerService,
  ) {}

  /**
   * Registers a new user.
   * @param registerDto - The registration data.
   * @returns A response message indicating the success of the registration.
   */
  @HttpCode(201)
  @Post('register')
  async registerUser(
    @Body(HashPasswordPipe) registerDto: RegisterDto,
  ): Promise<ResponseMessage> {
    const newUser = await this.authService.register(registerDto);
    // const verificationToken = await this.authService.getVerificationToken(
    //   newUser.email,
    // );
    // await this.mailerService.SendVerificationMail(
    //   newUser.email,
    //   verificationToken,
    // );
    return { message: 'El usuario a sido creado con éxito' };
  }

  /**
   * Logs in a user.
   * @param signInDto - The login data.
   * @param res - The HTTP response object.
   * @returns An access token for the logged-in user.
   */
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(
    @Body() signInDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessToken> {
    const tokens: Tokens = await this.authService.login(signInDto.email);
    this.authService.setRefreshToken(tokens.refresh_token, res);
    return tokens;
  }

  /**
   * Refreshes the access token for a user.
   * @param refreshToken - The refresh token.
   * @param id - The user ID.
   * @param res - The HTTP response object.
   * @returns A new access token.
   */
  // @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(
    @RefreshTokenCookie() refreshToken: string,
    @UserParamID() id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessToken> {
    console.log(refreshToken);
    
    const tokens = await this.authService.refreshTokens(id, refreshToken);
    this.authService.setRefreshToken(tokens.refresh_token, res);
    return tokens;
  }

  /**
   * Verifies a user's account.
   * @param token - The verification token.
   * @returns A response message indicating the success of the account verification.
   */
  @Get('verify')
  async verifyUser(@Query('token') token: string): Promise<ResponseMessage> {
    const verifyToken = await this.authService.verifyVerificationToken(token);
    this.authService.validateAccount(verifyToken.email);
    return { message: 'La cuenta del usuario ha sido validada.' };
  }

}
