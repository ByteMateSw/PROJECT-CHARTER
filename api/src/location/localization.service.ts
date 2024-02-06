import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Localization } from './localization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocalizationService {
  constructor(
    @InjectRepository(Localization)
    private localizationRepository: Repository<Localization>,
  ) {}
  createLocation(Location) {
    const newLocation = this.localizationRepository.create(Location);
    return this.localizationRepository.save(newLocation);
  }
}
