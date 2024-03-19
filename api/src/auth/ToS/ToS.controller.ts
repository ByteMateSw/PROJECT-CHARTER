import { Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { CustomParseIntPipe } from '../../utils/pipes/parse-int.pipe';
import { ResponseMessage } from '../../utils/types/functions.type';

/**
 * Controller for handling Terms of Service (ToS) related operations.
 */
@Controller('ToS')
export class ToSController {
  constructor(private userService: UserService) {}

  /**
   * Endpoint for accepting the Terms of Service (ToS) for a user.
   * @param id - The ID of the user.
   * @returns A Promise that resolves to a ResponseMessage indicating the result of accepting the ToS.
   */
  @HttpCode(HttpStatus.ACCEPTED)
  @Post(':id/accept')
  async acceptToS(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<ResponseMessage> {
    await this.userService.acceptToSUser(id);
    return { message: 'Se aceptó los Términos y Servicios' };
  }
}
