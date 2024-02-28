import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from './province.entity';
import { City } from '../city/city.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async createProvince(name: string): Promise<string> {
    console.log(name);
    const provinceExist = await this.provinceRepository.findOne({
      where: { name },
    });

    if (!provinceExist) {
      const newProvince = this.provinceRepository.create({ name: name });
      if(!newProvince)throw new BadRequestException('No se ha podido crear la provincia nueva')
      const saveProvince = this.provinceRepository.save(newProvince);
    if(!saveProvince)throw new BadRequestException('No se ha podido guardar la nueva provincia')
      return 'Provincia Guardada';
    } else {
      return 'La provincia ya existe'; //Cuando no se manda nada tambien entra aca :V
    }
  }

  async getProvinces(): Promise<Province[] | string> {
    const provinceCity = await this.provinceRepository.find({ relations: ['cities'] });
    if (!provinceCity)throw new NotFoundException ('No se encontró la ciudad en la provincia')
    return provinceCity
  }

  async getOneProvince(id: number): Promise<Province | string> {
    if (id) {
      const province = await this.provinceRepository.findOne({
        where: { id },
        relations: ['cities'],
      });
      if (!province) {
        throw new NotFoundException('No se encontró la provincia');
      }
      return province;
    } else {
      return 'Debe proporcionar un ID o un nombre de provincia';
    }
  }

  async updateProvince(id: number, name: string): Promise<string> {
    if (id) {
      const province = await this.provinceRepository.findOne({
        where: { id },
      });
      if (!province) {
        throw new NotFoundException('No se encontró la provincia');
      }
      province.name = name;
      const saveProvince = await this.provinceRepository.save(province);
      if (!saveProvince) throw new BadRequestException ('No se ha podido guardar la provincia')
      return 'La provincia actualizada';
    } else {
      return ' No se mando la id de la provincia ';
    }
  }

  async addCity(id: number, cityId: number): Promise<string> {
    if (id) {
      const province = await this.provinceRepository.findOne({
        where: { id },
        relations: ['cities'],
      });
      if (!province) {
        throw new NotFoundException('No se encontró la provincia');
      }

      const city = await this.cityRepository.findOne({
        where: { id: cityId },
      });

      if (!city) {
        throw new NotFoundException('No se encontró la ciudad');
      }
      province.cities.push(city);
      const save = await this.provinceRepository.save(province);
      if(!save) throw new BadRequestException('No se pudo guardar la provincia');
      return 'La ciudad actualizada';
    } else {
      return ' No se mando la id de la ciudad ';
    }
  }

  async deleteProvince(id: number): Promise<string> {
    if (id) {
      const provinceExist = await this.provinceRepository.findOne({
        where: { id },
      });

      if (!provinceExist) {
        throw new NotFoundException('No se encontró la provincia');
      }
      const deleteProvince = await this.provinceRepository.delete({ id });
      if(!deleteProvince) throw new BadRequestException('No se pudo borrar la provincia');
    } else {
      return 'Debe proporcionar un ID  de provincia';
    }
    return 'Provincia eliminada correctamente';
  }

  async getProvinceBySearch(name: string): Promise<any> {
    const provincename = await this.provinceRepository.findOneBy({
      name: name,
    });
    if(!provincename) throw new NotFoundException('No se pudo encontrar la provincia')
    return provincename;
  }
}
