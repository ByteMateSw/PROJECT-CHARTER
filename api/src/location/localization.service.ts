import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country, Province, City } from './localization.entity';
import { Repository } from 'typeorm';
//import { UpdateLocalizationDto } from './dto/update-localization.dto';
//import { CreateLocalizationDto } from './dto/create-location.dto';

const citiesData = require('../../src/cities.json');

@Injectable()
export class LocalizationService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async createCity(newLocalizationData): Promise<string> {
    const { city, country, province, lat, lng } = newLocalizationData;

    await this.countryRepository.findOne(country);
    await this.provinceRepository.findOne(province);

    // Crear una nueva instancia de City y asignar la provincia correspondiente
    const newCity = new City();
    newCity.name = city;
    newCity.province = province;

    // Guardar la nueva instancia de City en la base de datos
    const savedCity = await this.cityRepository.save(newCity);

    // Crear una nueva instancia de Localization y asignar el país, la provincia y la ciudad correspondientes
    const newLocalization = new Localization();
    newLocalization.city = savedCity.name;
    newLocalization.country = country.name;
    newLocalization.capital = country.capital; // Supongamos que el país tiene una propiedad "capital"
    // Guardar la nueva instancia de Localization en la base de datos
    await this.localizationRepository.save(newLocalization);
    return 'Ubicación guardada correctamente';
    /*
    try {
      const newLocalization =
        this.localizationRepository.create(newLocalizationData);
      this.localizationRepository.save(newLocalization);
      return 'Ubicacion Guardada';
    } catch (error) {
      return 'Error al crear la localizacion';
    }*/
  }

  uploadJsonLocalizations(): string {
    try {
      for (const city of citiesData) {
        const newCity = this.localizationRepository.create(city);
        this.localizationRepository.save(newCity);
      }
      return 'Lista cargada con exito';
    } catch (error) {
      return 'error al subir la lista';
    }
  }

  getLocalizations(): Promise<Localization[]> | string {
    try {
      return this.localizationRepository.find();
    } catch (error) {
      return 'Error al obtener las localizaciones';
    }
  }

  async getOneLocalization(id: number): Promise<Localization | string> {
    try {
      const localization = await this.localizationRepository.findOne({
        where: { id },
      });
      if (!localization) {
        return 'No se encontro la localizacion';
      }
      return localization;
    } catch (error) {
      return 'error al obtener una localizacion';
    }
  }

  async updateLocalization(id: number, localization): Promise<string> {
    try {
      const localizationExist = await this.localizationRepository.findOne({
        where: { id },
      });
      if (!localizationExist) {
        return 'No se encontro la localizacion';
      }

      await this.localizationRepository.update({ id }, localization);

      return 'Localizacion actualizada correctamente';
    } catch (error) {
      return 'Error al actualizar Localizacion';
    }
  }

  async deleteLocalization(id: number): Promise<string> {
    try {
      const localization = await this.localizationRepository.findOne({
        where: { id },
      });
      if (!localization) {
        return 'la localizacion ingresada no existe ';
      }
      await this.localizationRepository.delete({
        id,
      });
      return 'Localizacion eliminada correctamente';
    } catch (error) {
      return 'Error al eliminar la localizacion';
    }
  }
}
