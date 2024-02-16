import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from './province.entity';
import { City } from '../city/city.entity';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async createProvince(name: string): Promise<string> {
    try {
      console.log(name);
      const provinceExist = await this.provinceRepository.findOne({
        where: { name },
      });

      if (!provinceExist) {
        const newProvince = this.provinceRepository.create({ name: name });

        this.provinceRepository.save(newProvince);
        return 'Provincia Guardada';
      } else {
        return 'La provincia ya existe'; //Cuando no se manda nada tambien entra aca :V
      }
    } catch (error) {
      return 'No se pudo crear la provincia';
    }
  }

  async getProvinces(): Promise<Province[] | string> {
    try {
      return await this.provinceRepository.find({ relations: ['cities'] });
    } catch (error) {
      return 'Error al obtener las localizaciones';
    }
  }

  async getOneProvince(id: number): Promise<Province | string> {
    try {
      if (id) {
        const province = await this.provinceRepository.findOne({
          where: { id },
          relations: ['cities'],
        });
        if (!province) {
          return 'No se encontró la provincia';
        }
        return province;
      } else {
        return 'Debe proporcionar un ID o un nombre de provincia';
      }
    } catch (error) {
      return 'Error al obtener la provincia';
    }
  }

  async updateProvince(id: number, name: string): Promise<string> {
    try {
      if (id) {
        const province = await this.provinceRepository.findOne({
          where: { id },
        });
        if (!province) {
          return 'No se encontro la provincia';
        }
        province.name = name;
        await this.provinceRepository.save(province);
        return 'La provincia actualizada';
      } else {
        return ' No se mando la id de la provincia ';
      }
    } catch (error) {
      return 'error al actualizar provincia';
    }
  }

  async addCity(id: number, cityId: number): Promise<string> {
    try {
      if (id) {
        const province = await this.provinceRepository.findOne({
          where: { id },
          relations: ['cities'],
        });
        if (!province) {
          return 'No se encontro la provincia';
        }

        const city = await this.cityRepository.findOne({
          where: { id: cityId },
        });

        if (!city) {
          return 'La ciudad no se encontró';
        }
        province.cities.push(city);
        await this.provinceRepository.save(province);

        return 'La ciudad actualizada';
      } else {
        return ' No se mando la id de la ciudad ';
      }
    } catch (error) {
      return error;
    }
  }

  async deleteProvince(id: number): Promise<string> {
    try {
      if (id) {
        const provinceExist = await this.provinceRepository.findOne({
          where: { id },
        });

        if (!provinceExist) {
          return 'No se encontro la provincia';
        }
        await this.provinceRepository.delete({ id });
      } else {
        return 'Debe proporcionar un ID  de provincia';
      }
      return 'Provincia eliminada correctamente';
    } catch (error) {
      return 'Error al eliminar la Provincia';
    }
  }
}
