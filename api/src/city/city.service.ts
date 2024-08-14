import {
  BadRequestException,
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
   * @returns A Promise that resolves to the created city.
   * @throws ConflictException if a city with the same name already exists.
   */
  async createCity(name: string): Promise<City> {
    const existsCity = await this.cityRepository.existsBy({ name });
    if (existsCity)
      throw new ConflictException('Ya existe una ciudad con ese nombre');

    const newCity = this.cityRepository.create({ name });
    return await this.cityRepository.save(newCity);
  }

  /**
   * Retrieves all cities along with their associated province.
   *
   * @returns A promise that resolves to an array of City objects.
   */
  async getAllCities(): Promise<City[]> {
    return await this.cityRepository.find({
      relations: { province: true },
    });
  }

  /**
   * Retrieves a single city by its ID.
   *
   * @param id - The ID of the city to retrieve.
   * @returns A promise that resolves to a City object.
   */
  async getCityById(id: number): Promise<City> {
    return await this.cityRepository.findOne({
      where: { id },
      relations: { province: true },
    });
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
  async updateCity(id: number, name: string): Promise<City> {
    const existsCity = await this.cityRepository.existsBy({ name });
    if (existsCity)
      throw new ConflictException('Ya existe una ciudad con ese nombre');

    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) throw new BadRequestException('No se encontró la ciudad');

    return await this.cityRepository.save({ ...city, ...{ name } });
  }

  /**
   * Deletes a city with the specified ID.
   * @param id - The ID of the city to delete.
   * @throws BadRequestException if the city with the specified ID does not exist.
   */
  async deleteCity(id: number): Promise<void> {
    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) throw new BadRequestException('No existe la ciudad');

    await this.cityRepository.remove(city);
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

  async getCitiesByProvinceName(provinceName: string): Promise<City[]> {
    // Buscar la provincia por su nombre
    const province = await this.provinceRepository.findOne({
      where: { name: provinceName },
      relations: ['cities'],
    });

    if (!province) {
      throw new NotFoundException('Provincia no encontrada');
    }

    // Devolver las ciudades relacionadas
    return province.cities;
  }

  async updateCityUserByName(cityName: string, userId: number) {
    const city = await this.cityRepository.findOne({
      where: { name: cityName },
    });
    if (!city) {
      throw new NotFoundException('City not found');
    }

    return this.userRepository.update(userId, { city: city });
  }
}
