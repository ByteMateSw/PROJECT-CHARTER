import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  ParseIntPipe,
  Param,
  Delete,
} from '@nestjs/common';
import { LocalizationService } from './localization.service';
import { UpdateLocalizationDto } from './dto/update-localization.dto';

@Controller('localization')
export class LocalizationController {
  constructor(private localizationService: LocalizationService) {}

  @Get('/list')
  getLocalizations() {
    return this.localizationService.getLocalizations();
  }

  @Get('/one/:id')
  getOneLocalization(@Param('id', ParseIntPipe) id: number) {
    return this.localizationService.getOneLocalization(id);
  }

  @Post('/save')
  createLocation(@Body() newLocalization) {
    return this.localizationService.createLocalization(newLocalization);
  }

  @Post('/listUpload')
  uploadJsonLocalizations() {
    return this.localizationService.uploadJsonLocalizations();
  }

  @Put('/update/:id')
  updateLocalization(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    localization: UpdateLocalizationDto,
  ) {
    return this.localizationService.updateLocalization(id, localization);
  }

  @Delete('/delete/:id')
  deleteLocalization(@Param('id', ParseIntPipe) id: number) {
    return this.localizationService.deleteLocalization(id);
  }
}
