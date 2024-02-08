
import { Injectable, CanActivate, ExecutionContext, HttpException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ToSGuard implements CanActivate {

  constructor(private userService: UserService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const email = request.body.email;
    if(!email)
        throw new HttpException("Bad credentials",400)

    const user = await this.userService.getByEmail(email)
    if(!user)
        throw new HttpException("Bad credentials",400)

    if(!user.acceptedToS)
        throw new UnauthorizedException("No se aceptó los Términos y Condiciones del servicio.")

    return true
  }
}
