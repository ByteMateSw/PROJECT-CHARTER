import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async createProvince(name: string) /*: Promise<Province>*/ {
    const provinceExists = await this.provinceRepository.existsBy({ name });
    if (provinceExists) throw new ConflictException('La provincia ya existe');

    const newProvince = this.provinceRepository.create({ name });
    return await this.provinceRepository.save(newProvince);
  }

  async getProvinces(): Promise<Province[]> {
    return await this.provinceRepository.find({
      relations: { cities: true },
    });
  }

  async getProvinceById(id: number): Promise<Province> {
    return await this.provinceRepository.findOne({
      where: { id },
      relations: { cities: true },
    });
  }

  async updateProvince(id: number, name: string): Promise<void> {
    const existsProvince = await this.provinceRepository.existsBy({ name });
    if (existsProvince)
      throw new BadRequestException('Existe una provincia con ese nombre');

    const province = await this.provinceRepository.findOne({
      where: { id },
    });
    if (!province) throw new BadRequestException('La provincia no existe');
    province.name = name;
    await this.provinceRepository.save(province);
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
      console.log(province);
      const save = await this.provinceRepository.save(province);
      if (!save)
        throw new BadRequestException('No se pudo guardar la provincia');
      return 'La ciudad actualizada';
    } else {
      return ' No se mando la id de la ciudad ';
    }
  }

  async deleteProvince(id: number): Promise<void> {
    const province = await this.provinceRepository.findOne({
      where: { id },
    });
    if (!province) throw new BadRequestException('No existe la provincia');

    await this.provinceRepository.remove(province);
  }

  async getProvinceBySearch(name: string): Promise<any> {
    const provincename = await this.provinceRepository.findOneBy({
      name: name,
    });
    if (!provincename)
      throw new NotFoundException('No se pudo encontrar la provincia');
    return provincename;
  }
}
