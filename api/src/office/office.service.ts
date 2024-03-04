import {
  BadRequestException,
  HttpCode,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Office } from './office.entity';
import { Repository } from 'typeorm';
import { CreateOfficeDto } from './dto/office.dto';

@Injectable()
export class OfficeService {
  constructor(
    @InjectRepository(Office)
    private readonly officeRepository: Repository<Office>,
  ) {}

  /**
   * Retrieves all offices.
   * @returns A promise that resolves to an array of Office objects.
   */
  async getAllOffices(): Promise<Office[]> {
    return await this.officeRepository.find();
  }

  /**
   * Retrieves an office by its ID.
   * @param id - The ID of the office to retrieve.
   * @returns A Promise that resolves to the retrieved office.
   * @throws NotFoundException if the office with the specified ID is not found.
   */
  async getOfficeById(id: number): Promise<Office> {
    const office = await this.officeRepository.findOneBy({ id });
    if (!office)
      throw new NotFoundException('No se ha podido encontrar el oficio');
    return office;
  }

  /**
   * Creates a new office.
   *
   * @param newOfficeData - The data for the new office.
   * @returns A Promise that resolves to the created office.
   * @throws BadRequestException if the office could not be created or saved.
   */
  async createOffice(newOfficeData: CreateOfficeDto): Promise<Office> {
    const newOffice = this.officeRepository.create(newOfficeData);
    if (!newOffice)
      throw new BadRequestException('No se ha podido crear el oficio');
    const saveOffice = await this.officeRepository.save(newOffice);
    if (!saveOffice)
      throw new BadRequestException('Error al guardar el nuevo oficio creado');
    return saveOffice;
  }

  /**
   * Updates an office with the provided data.
   *
   * @param id - The ID of the office to update.
   * @param updateOfficeData - The partial data to update the office with.
   * @returns A Promise that resolves to the updated office.
   * @throws NotFoundException if the office with the provided ID does not exist.
   * @throws BadRequestException if the office could not be updated or saved.
   */
  async updateOffice(
    id: number,
    updateOfficeData: Partial<CreateOfficeDto>,
  ): Promise<Office> {
    const officeFound = await this.officeRepository.findOne({ where: { id } });
    if (!officeFound) throw new NotFoundException('El oficio no existe');
    const updateOffice = { ...officeFound, ...updateOfficeData };
    if (!updateOffice)
      throw new BadRequestException('No se pudo actualizar el oficio');
    const saveOffice = await this.officeRepository.save(updateOffice);
    if (!saveOffice)
      throw new BadRequestException('No se pudo guardar el oficio actualizado');
    return saveOffice;
  }

  /**
   * Deletes an office by its ID.
   * @param id - The ID of the office to delete.
   * @returns A promise that resolves to undefined.
   * @throws NotFoundException if the office does not exist.
   * @throws BadRequestException if the office deletion fails.
   */
  async deleteOffice(id: number): Promise<void> {
    const office = await this.officeRepository.findOne({ where: { id } });
    if (!office) throw new NotFoundException('El oficio no existe');
    const delOffice = await this.officeRepository.delete(office);
    if (!delOffice)
      throw new BadRequestException('No se ha podido borrar el oficio');
  }

  /**
   * Retrieves an office by its name.
   * @param name - The name of the office to search for.
   * @returns A Promise that resolves to the found office.
   * @throws NotFoundException if the office with the specified name is not found.
   */
  async getOfficeBySearch(name: string): Promise<Office> {
    const officename = await this.officeRepository.findOneBy({ name: name });
    if (!officename)
      throw new NotFoundException('No se ha podido encontrar el oficio');
    return officename;
  }
}
