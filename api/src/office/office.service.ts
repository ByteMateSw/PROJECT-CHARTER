import { HttpCode, Injectable } from '@nestjs/common';
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

  async getAll(): Promise<Office[]> {
    const offices = await this.officeRepository.find();
    if (!offices) throw new Error('No se han podido traer todos los oficios');
    return offices;
  }

  async getOfficeById(id): Promise<Office> {
    const office = await this.officeRepository.findOneBy(id);
    if (!office) throw new Error('No se ha podido encontrar el oficio');
    return office;
  }

  async createOffice(newOfficeData: CreateOfficeDto): Promise<Office> {
    const newOffice = this.officeRepository.create(newOfficeData);
    if (!newOffice) throw new Error('No se ha podido crear el oficio');
    const saveOffice = await this.officeRepository.save(newOffice);
    if (!saveOffice) throw new Error('Error al guardar el nuevo oficio creado');
    return saveOffice;
  }

  async updateOffice(
    id: number,
    updateOfficeData: Partial<CreateOfficeDto>,
  ): Promise<Office> {
    const officeFound = await this.officeRepository.findOne({ where: { id } });
    if (!officeFound) throw new Error('El oficio no existe');
    const updateOffice = { ...officeFound, ...updateOfficeData };
    if (!updateOffice) throw new Error('No se pudo actualizar el oficio');
    const saveOffice = await this.officeRepository.save(updateOffice);
    if (!saveOffice) throw new Error('No se pudo guardar el oficio actualizado');
    return saveOffice;
  }

  async deleteOffice(id: number): Promise<undefined> {
    const office = await this.officeRepository.findOne({ where: { id } });
    if (!office) throw new Error('El oficio no existe');
    const delOffice = await this.officeRepository.delete(office);
    if (!delOffice) throw new Error ('No se ha podido borrar el oficio')
    return undefined
  }

  async getOfficeBySearch(name: string): Promise<any> {
    const officename = await this.officeRepository.findOneBy({ name: name });
    if (!officename) throw new Error('No se ha podido encontrar el oficio');
    return officename;
  }
}
