import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';
import { Province } from '../province/province.entity';
import { User } from '../user/user.entity';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //Funcion para crear city solamente con el nombre
  async createCity(name: string): Promise<string> {
    const cityExist = await this.cityRepository.findOne({ where: { name } });

    if (cityExist) {
      throw new ConflictException('Ya existe una ciudad con ese nombre');
    }

    const newCity = this.cityRepository.create({ name });
    const savedCity = await this.cityRepository.save(newCity);

    if (!savedCity) {
      throw new InternalServerErrorException('No se pudo crear la ciudad');
    }

    return 'Ciudad Guardada';
    if (!cityExist) {
      const newCity = this.cityRepository.create({
        name,
      });
      
      this.cityRepository.save(newCity);
      return 'Ciudad Guardada';
    } else {
      return 'La ciudad ya existe';
    }
    
  }

  async getCities(): Promise<City[] | string> {
    const cities = await this.cityRepository.find({
      relations: ['province', 'users'],
    });
    if (cities) {
      return cities;
    } else {
      throw new InternalServerErrorException(
        'No se pudieron obtener las ciudades',
      );
    }
  }

  async getOneCity(id: number): Promise<City | string> {
    if (!id) {
      return 'Debe proporcionar un ID o un nombre de ciudad';
    }

    const city = await this.cityRepository.findOne({
      where: { id },
      relations: ['province', 'users'],
    });

    if (!city) {
      throw new NotFoundException('No se encontró la ciudad');
    }

    return city;
  }

  async updateCityProvince(id: number, provinceId: number): Promise<string> {
    if (!id) {
      return 'No se mandó la ID de la ciudad';
    }

    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) {
      throw new NotFoundException('No se encontró la ciudad');
    }

    const province = await this.provinceRepository.findOne({
      where: { id: provinceId },
    });
    if (!province) {
      throw new NotFoundException('No se encontró la provincia');
    }

    city.province = province;
    await this.cityRepository.save(city);

    return 'Ciudad actualizada';
  }

  async updateCityUser(id: number, userId: number): Promise<string> {
    if (!id) {
      return 'No se mandó la ID de la ciudad';
    }

    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) {
      throw new NotFoundException('No se encontró la ciudad');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('No se encontró el usuario');
    }

    if (!user.city) {
      city.users.push(user);
    } else {
      user.city = city;
    }

    await this.cityRepository.save(city);

    return 'La ciudad se actualizó correctamente';
  }

  //cambiar el nombre de la ciudad
  async updateCity(id: number, name: string): Promise<string> {
    if (!id) {
      return 'No se mandó la ID de la ciudad';
    }

    const cityExist = await this.cityRepository.findOne({ where: { id } });
    if (!cityExist) {
      throw new NotFoundException('No se encontró la ciudad');
    }

    await this.cityRepository.update(id, { name });

    return 'Ciudad actualizada';
  }

  async deleteCity(id: number): Promise<string> {
    if (!id) {
      return 'Debe proporcionar un ID de ciudad';
    }

    const cityExist = await this.cityRepository.findOne({ where: { id } });
    if (!cityExist) {
      throw new NotFoundException('No se encontró la ciudad');
    }

    await this.cityRepository.delete({ id });

    return 'Ciudad eliminada correctamente';
  }

  async getCityBySearch(name: string): Promise<any> {
    const city = await this.cityRepository.findOne({ where: { name } });

    if (!city) {
      throw new NotFoundException('No se ha encontrado la ciudad');
    }

    return city;
  }
}
