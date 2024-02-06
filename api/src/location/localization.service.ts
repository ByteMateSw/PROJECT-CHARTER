import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Localization } from './localization.entity';
import { Repository } from 'typeorm';
import { UpdateLocalizationDto } from './dto/update-localization.dto';
const citiesData = require('../../src/cities.json');

@Injectable()
export class LocalizationService {
  constructor(
    @InjectRepository(Localization)
    private localizationRepository: Repository<Localization>,
  ) {}
  createLocalization(newLocalizationData) {
    const newLocalization =
      this.localizationRepository.create(newLocalizationData);
    return this.localizationRepository.save(newLocalization);
  }

  async uploadJsonLocalizations() {
    for (const city of citiesData) {
      const newCity = this.localizationRepository.create(city);
      await this.localizationRepository.save(newCity);
    }
    return { message: 'success' };
  }

  getLocalizations() {
    return this.localizationRepository.find();
  }

  getOneLocalization(id: number) {
    return this.localizationRepository.findOne({ where: { id } });
  }

  updateLocalization(id: number, localization: UpdateLocalizationDto) {
    return this.localizationRepository.update({ id }, localization);
  }

  deleteLocalization(id: number) {
    return this.localizationRepository.delete({ id });
  }
}
