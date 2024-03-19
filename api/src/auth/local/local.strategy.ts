import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../../user/user.entity';

/**
 * Local authentication strategy for Passport.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  /**
   * Validates the user's email and password.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns A Promise that resolves to the validated User object.
   * @throws BadRequestException if the credentials are incorrect.
   */
  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validate(email, password);
    if (!user) throw new BadRequestException('Credenciales incorrectas');
    return user;
  }
}
