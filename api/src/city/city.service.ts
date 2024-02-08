import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async createCity(newCityData) {
    try {
      const { name } = newCityData;
      console.log(name);
      const cityExist = await this.cityRepository.findOne({
        where: { name },
      });

      if (!cityExist) {
        const newCity = this.cityRepository.create(newCityData);

        this.cityRepository.save(newCity);
        return 'ciudad Guardada';
      } else {
        return 'La ciudad ya existe'; //Cuando no se manda nada tambien entra aca :V
      }
    } catch (error) {
      return 'No se pudo crear la ciudad';
    }
  }

  getCity(): Promise<City[]> | string {
    try {
      return this.cityRepository.find();
    } catch (error) {
      return 'Error al obtener las localizaciones';
    }
  }

  async getOneCity(id: number): Promise<City | string> {
    try {
      if (id) {
        const city = await this.cityRepository.findOne({
          where: { id },
        });
        if (!city) {
          return 'No se encontró la ciudad';
        }
        return city;
      } else {
        return 'Debe proporcionar un ID o un nombre de ciudad';
      }
    } catch (error) {
      return 'Error al obtener la ciudad';
    }
  }

  async updateCity(id: number, cityData): Promise<string> {
    try {
      if (id) {
        const cityExist = await this.cityRepository.findOne({
          where: { id },
        });
        if (!cityExist) {
          return 'No se encontro la ciudad';
        }
        await this.cityRepository.update(id, cityData);
        return 'La ciudad actualizada';
      } else {
        return ' No se mando la id de la ciudad ';
      }
    } catch (error) {
      return 'error al actualizar ciudad';
    }
  }

  async deleteCity(id: number): Promise<string> {
    try {
      if (id) {
        const cityExist = await this.cityRepository.findOne({
          where: { id },
        });

        if (!cityExist) {
          return 'No se encontro la ciudad';
        }
        await this.cityRepository.delete({ id });
      } else {
        return 'Debe proporcionar un ID  de ciudad';
      }

      return 'Localizacion eliminada correctamente';
    } catch (error) {
      return 'Error al eliminar la localizacion';
    }
  }
}
