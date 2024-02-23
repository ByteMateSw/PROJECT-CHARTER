import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class ToSGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.body?.email) {
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
