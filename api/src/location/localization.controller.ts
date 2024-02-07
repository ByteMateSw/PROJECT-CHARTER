import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  ParseIntPipe,
  Param,
  Delete,
} from '@nestjs/common';
import { LocalizationService } from './localization.service';
import { City, Country, Province } from './localization.entity';

//import { UpdateLocalizationDto } from './dto/update-localization.dto';
//import { CreateLocalizationDto } from './dto/create-location.dto';

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
  createLocalization(@Body() newLocalization) {
    return this.localizationService.createCity(newLocalization);
  }

  @Post('/listUpload')
  uploadJsonLocalizations() {
    return this.localizationService.uploadJsonLocalizations();
  }

  @Put('/update/:id')
  updateLocalization(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    localization,
  ) {
    return this.localizationService.updateLocalization(id, localization);
  }

  @Delete('/delete/:id')
  deleteLocalization(@Param('id', ParseIntPipe) id: number) {
    return this.localizationService.deleteLocalization(id);
  }
}
