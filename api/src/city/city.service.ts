import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';
import { Province } from 'src/province/province.entity';
import { CreateCityWithRelationDto } from './dto/createCityWithRelation.dto';
import { CreateCityDto } from './dto/createCity.dto';
import { User } from 'src/user/user.entity';

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
  async createCity(newCityData: CreateCityDto) {
    const { name } = newCityData;
    try {
      const cityExist = await this.cityRepository.findOne({
        where: { name },
      });

      if (!cityExist) {
        const newCity = this.cityRepository.create({
          name,
        });

        this.cityRepository.save(newCity);
        return 'ciudad Guardada';
      } else {
        return 'La ciudad ya existe';
      }
    } catch (error) {
      return 'No se pudo crear la ciudad';
    }
  }

  /* //Funcion para crear city relacionada con una id de una provincia existente
  async createCityWithRelation(newCityData: CreateCityWithRelationDto) {
    const { name, provinceId } = newCityData;
    try {
      console.log(provinceId);
      const cityExist = await this.cityRepository.findOne({
        where: { name },
      });

      if (!cityExist) {
        const province = await this.provinceRepository.findOne({
          where: { id: provinceId },
        });

        if (!province) {
          return 'La provincia especificada no existe';
        }
        const newCity = this.cityRepository.create({
          name,
          province: province,
        });

        this.cityRepository.save(newCity);
        return 'ciudad Guardada';
      } else {
        return 'La ciudad ya existe'; //Cuando no se manda nada tambien entra aca :V
      }
    } catch (error) {
      return 'No se pudo crear la ciudad';
    }
  }*/

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

  async updateCityProvince(id: number, provinceId: number): Promise<string> {
    try {
      if (id) {
        const city = await this.cityRepository.findOne({
          where: { id },
        });
        if (!city) {
          return 'No se encontro la ciudad';
        }
        console.log(provinceId);
        console.log(city.name);

        const province = await this.provinceRepository.findOne({
          where: { id: provinceId },
        });
        province.name;

        if (!province) {
          return 'La provincia no se encontró';
        }
        city.province = province;
        await this.cityRepository.save(city);

        return 'La ciudad actualizada';
      } else {
        return ' No se mando la id de la ciudad ';
      }
    } catch (error) {
      return error;
    }
  }

  async updateCityUser(id: number, userId: number): Promise<string> {
    try {
      if (id) {
        const city = await this.cityRepository.findOne({
          where: { id },
        });
        if (!city) {
          return 'No se encontro la ciudad';
        }

        const user = await this.userRepository.findOne({
          where: { id: userId },
        });

        if (!user) {
          return 'El usuario no se encontró';
        }
        city.users.push(user);
        await this.cityRepository.save(city);

        return 'La ciudad actualizada';
      } else {
        return ' No se mando la id de la ciudad ';
      }
    } catch (error) {
      return error;
    }
  }

  //cambiar el nombre de la ciudad
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
