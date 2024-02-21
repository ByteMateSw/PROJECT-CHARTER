import { Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { CustomParseIntPipe } from '../../utils/pipes/parse-int.pipe';
import { ResponseMessage } from '../../utils/types/functions.type';

@Controller('ToS')
export class ToSController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Post(':id/accept')
  async acceptToS(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<ResponseMessage> {
    await this.userService.acceptToSUser(id);
    return { message: 'Se aceptó los Términos y Servicios' };
  }
}
