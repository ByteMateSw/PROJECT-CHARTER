import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';

/**
 * Guard that checks if the user has accepted the Terms of Service (ToS) before allowing access to a route.
 */
@Injectable()
export class ToSGuard implements CanActivate {
  constructor(private userService: UserService) {}

  /**
   * Determines if the user has accepted the ToS.
   * @param context - The execution context of the route.
   * @returns A promise that resolves to a boolean indicating if the user has accepted the ToS.
   * @throws BadRequestException if the request body is missing or does not contain an email.
   * @throws BadRequestException if the email provided is not valid.
   * @throws UnauthorizedException if the user has not accepted the ToS.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.body && request.body.email) {
      const email: string = request.body.email;

      const existsEmail = await this.userService.existsEmail(email);
      if (!existsEmail)
        throw new BadRequestException('Credenciales incorrectas');

      const acceptedToS = await this.userService.isToSAcceptedByUser({
        email,
      });

      if (!acceptedToS)
        throw new UnauthorizedException(
          'No se aceptó los Términos y Condiciones del servicio.',
        );

      return true;
    }

    throw new BadRequestException('Credenciales incorrectas');
  }
}
