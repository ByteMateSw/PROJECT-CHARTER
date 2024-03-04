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

  /**
   * Creates a new city with the given name.
   * 
   * @param name - The name of the city to create.
   * @returns A Promise that resolves to a string indicating the status of the operation.
   * @throws ConflictException if a city with the same name already exists.
   * @throws InternalServerErrorException if the city could not be created.
   */
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
  }

  /**
   * Retrieves all cities along with their associated province and users.
   * 
   * @returns A promise that resolves to an array of City objects or a string if an error occurs.
   * @throws InternalServerErrorException if the cities cannot be retrieved.
   */
  async getCities(): Promise<City[] | string> {
    const cities = await this.cityRepository.find({
      relations: ['province', 'users'],
    });
    if (!cities) {
      throw new InternalServerErrorException('No se pudieron obtener las ciudades');
    }
    return cities;
  }

  /**
   * Retrieves a single city by its ID.
   * 
   * @param id - The ID of the city to retrieve.
   * @returns A promise that resolves to a City object or a string if an error occurs.
   * @throws NotFoundException if the city cannot be found.
   */
  async getOneCity(id: number): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: { id },
      relations: ['province', 'users'],
    });

    if (!city) {
      throw new NotFoundException('No se encontró la ciudad');
    }
    return city;
  }

  /**
   * Updates the province of a city.
   * @param id - The ID of the city to update.
   * @param provinceId - The ID of the new province for the city.
   * @returns A promise that resolves to a string indicating the success of the update.
   * @throws NotFoundException if the city or province is not found.
   */
  async updateCityProvince(id: number, provinceId: number): Promise<string> {
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

  /**
   * Updates the user associated with a city.
   * 
   * @param id - The ID of the city to update.
   * @param userId - The ID of the new user for the city.
   * @returns A promise that resolves to a string indicating the success of the update.
   * @throws NotFoundException if the city or user is not found.
   */
  async updateCityUser(id: number, userId: number): Promise<string> {
    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) {
      throw new NotFoundException('No se encontró la ciudad');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('No se encontró el usuario');
    }

    city.users.push(user);
    await this.cityRepository.save(city);

    return 'La ciudad se actualizó correctamente';
  }
  
  /**
   * Updates the name of a city with the specified ID.
   * @param id - The ID of the city to update.
   * @param name - The new name for the city.
   * @returns A Promise that resolves to a string indicating the success of the update operation.
   * @throws NotFoundException if the city with the specified ID does not exist.
   */
  async updateCity(id: number, name: string): Promise<string> {
    const cityExist = await this.cityRepository.findOne({ where: { id } });
    if (!cityExist) {
      throw new NotFoundException('No se encontró la ciudad');
    }

    await this.cityRepository.update(id, { name });
    return 'Ciudad actualizada';
  }

  /**
   * Deletes a city with the specified ID.
   * @param id - The ID of the city to delete.
   * @returns A Promise that resolves to a string indicating the success of the operation.
   * @throws NotFoundException if the city with the specified ID does not exist.
   */
  async deleteCity(id: number): Promise<string> {
    const cityExist = await this.cityRepository.findOne({ where: { id } });
    if (!cityExist) {
      throw new NotFoundException('No se encontró la ciudad');
    }

    await this.cityRepository.delete({ id });
    return 'Ciudad eliminada correctamente';
  }

  /**
   * Retrieves a city by its name.
   *
   * @param name - The name of the city to search for.
   * @returns A Promise that resolves to the found city.
   * @throws NotFoundException if the city is not found.
   */
  async getCityBySearch(name: string): Promise<any> {
    const city = await this.cityRepository.findOne({ where: { name } });
    if (!city) {
      throw new NotFoundException('No se ha encontrado la ciudad');
    }
    return city;
  }
}
