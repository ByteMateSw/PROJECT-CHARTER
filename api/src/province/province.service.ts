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

  /**
   * Creates a new province with the specified name.
   * @param name - The name of the province to create.
   * @returns A Promise that resolves to a string indicating the result of the creation operation.
   *          - If the province with the specified name already exists, the string will be 'La provincia ya existe'.
   *          - If the creation is successful, the string will be 'Provincia Guardada'.
   *          - If the creation fails, a BadRequestException will be thrown.
   */
  async createProvince(name: string): Promise<Province> {
    const provinceExists = await this.provinceRepository.existsBy({ name });
    if (provinceExists) throw new ConflictException('La provincia ya existe');
    const newProvince = this.provinceRepository.create({ name });
    return await this.provinceRepository.save(newProvince);
  }

  /**
   * Retrieves all provinces along with their associated cities.
   * @returns A Promise that resolves to an array of Province objects or a string if an error occurs.
   * @throws NotFoundException if no cities are found in the province.
   */
  async getProvinces(): Promise<Province[]> {
    return await this.provinceRepository.find({
      relations: { cities: true },
    });
  }

  /**
   * Retrieves a single province by its ID.
   * @param id - The ID of the province to retrieve.
   * @returns A Promise that resolves to the found province or an error message if not found.
   * @throws NotFoundException if the province is not found.
   */
  async getProvinceById(id: number): Promise<Province> {
    return await this.provinceRepository.findOne({
      where: { id },
      relations: { cities: true },
    });
  }

  /**
   * Updates the name of a province with the specified ID.
   * @param id - The ID of the province to update.
   * @param name - The new name for the province.
   * @returns A Promise that resolves to a string indicating the result of the update operation.
   *          - If the update is successful, the string will be 'La provincia actualizada'.
   *          - If the province with the specified ID is not found, a NotFoundException will be thrown.
   *          - If the ID is not provided, the string will be 'No se mando la id de la provincia'.
   * @throws NotFoundException - If the province with the specified ID is not found.
   * @throws BadRequestException - If the update operation fails.
   */
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

  /**
   * Adds a city to a province.
   * @param id - The ID of the province.
   * @param cityId - The ID of the city to be added.
   * @returns A promise that resolves to a string indicating the success or failure of the operation.
   * @throws NotFoundException if the province or city is not found.
   * @throws BadRequestException if the province cannot be saved.
   */
  async addCity(id: number, cityId: number): Promise<string> {
    if (!id) {
      return 'Debe proporcionar un ID de provincia';
    }

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

    if (!save) {
      throw new BadRequestException('No se pudo guardar la provincia');
    }

    return 'La ciudad ha sido agregada a la provincia';
  }

  /**
   * Deletes a province by its ID.
   * @param id - The ID of the province to delete.
   * @returns A promise that resolves to a string indicating the result of the deletion.
   * @throws NotFoundException if the province with the given ID does not exist.
   * @throws BadRequestException if the deletion fails for any other reason.
   */
  async deleteProvince(id: number): Promise<string> {
    if (id) {
      const provinceExist = await this.provinceRepository.findOne({
        where: { id },
      });

      if (!provinceExist) {
        throw new NotFoundException('No se encontró la provincia');
      }
      const deleteProvince = await this.provinceRepository.delete({ id });
      if (!deleteProvince)
        throw new BadRequestException('No se pudo borrar la provincia');
    } else {
      return 'Debe proporcionar un ID  de provincia';
    }
    return 'Provincia eliminada correctamente';
  }

  /**
   * Retrieves a province by its name.
   * @param name - The name of the province to search for.
   * @returns A Promise that resolves to the found province.
   * @throws NotFoundException if the province is not found.
   */
  async getProvinceBySearch(name: string): Promise<any> {
    const provincename = await this.provinceRepository.findOneBy({
      name: name,
    });
    if (!provincename)
      throw new NotFoundException('No se pudo encontrar la provincia');
    return provincename;
  }
}
