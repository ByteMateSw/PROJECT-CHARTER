import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Office } from './office.entity';
import { Repository } from 'typeorm';
import { OfficeDto } from './dto/office.dto';

@Injectable()
export class OfficeService {
  constructor(
    @InjectRepository(Office)
    private officeRepository: Repository<Office>,
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
   */
  async getOfficeById(id: number): Promise<Office> {
    return await this.officeRepository.findOne({
      where: { id },
    });
  }

  /**
   * Creates a new office.
   *
   * @param Office - The data for the new office.
   * @returns A Promise that resolves to the created office.
   * @throws BadRequestException if the office already exists.
   */
  async createOffice(createOffice: OfficeDto): Promise<Office> {
    const existsOffice = await this.officeRepository.existsBy({
      name: createOffice.name,
    });
    if (existsOffice) throw new BadRequestException('El oficio ya existe');

    const newOffice = this.officeRepository.create(createOffice);
    return await this.officeRepository.save(newOffice);
  }

  /**
   * Updates an office with the provided data.
   *
   * @param id - The ID of the office to update.
   * @param updateOfficeData - The data to update the office with.
   * @returns A Promise that resolves to the updated office.
   * @throws NotFoundException if the office does not exist.
   * @throws BadRequestException if the category does not exist.
   */
  async updateOffice(id: number, updateOffice: OfficeDto): Promise<Office> {
    const existsOffice = await this.officeRepository.existsBy({
      name: updateOffice.name,
    });
    if (existsOffice) throw new BadRequestException('El oficio ya existe');

    const office = await this.officeRepository.findOne({ where: { id } });
    if (!office) throw new NotFoundException('El oficio no existe');

    return await this.officeRepository.save({ ...office, ...updateOffice });
  }

  /**
   * Deletes an office by its ID.
   * @param id - The ID of the office to delete.
   * @throws BadRequestException if the office does not exist.
   */
  async deleteOffice(id: number): Promise<void> {
    const office = await this.officeRepository.findOne({ where: { id } });
    if (!office) throw new BadRequestException('El oficio no existe');
    await this.officeRepository.remove(office);
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
