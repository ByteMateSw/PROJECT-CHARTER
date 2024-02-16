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

    if (request.user?.acceptedToS != undefined) {
      if (!request.user.acceptedToS)
        throw new UnauthorizedException(
          'No se aceptó los Términos y Condiciones del servicio.',
        );
      return true;
    }

    if (request.body?.email) {
      const email: string = request.body.email;

      const user = await this.userService.getByEmail(email);
      if (!user) throw new BadRequestException('Bad credentials');

      if (!user.acceptedToS)
        throw new UnauthorizedException(
          'No se aceptó los Términos y Condiciones del servicio.',
        );

      return true;
    }

    throw new BadRequestException('Bad credentials');
  }
}
