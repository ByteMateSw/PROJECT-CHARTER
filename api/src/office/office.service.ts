import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Office } from './office.entity';
import { Repository } from 'typeorm';
import { CreateOfficeDto } from './dto/office.dto';

@Injectable()
export class OfficeService {
  findOne(arg0: number): Office | PromiseLike<Office> {
    throw new Error('Method not implemented.');
  }
  findAll(): Office[] | PromiseLike<Office[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Office)
    private readonly officeRepository: Repository<Office>,
  ) {}

  getAll() {
    return this.officeRepository.find();
  }

  getById(id: number) {
    return this.officeRepository.findOneBy({ id });
  }

  async createOffice(newOfficeData: CreateOfficeDto): Promise<Office> {
    try {
      return await this.officeRepository.save(newOfficeData);
    } catch (error) {
      console.error('Error al crear el oficio', error.message);
      throw new Error('Error al crear el oficio');
    }
  }

  async updateOffice(office): Promise<Office> {
    try {
      const id = office.id;
      const officeFound = await this.officeRepository.findOne(id);
      if (!officeFound) throw new Error('El oficio no existe');
      const updatedOffice = await this.officeRepository.merge(
        officeFound,
        office,
      );
      return await this.officeRepository.save(updatedOffice);
    } catch (error) {
      console.error('El oficio no se ha podido actualizar', error.message);
      throw new Error('El oficio no se ha podido actualizar');
    }
  }

  async deleteOffice(id: number): Promise<Office> {
    try {
      const office = await this.officeRepository.findOneBy({ id });
      if (!office) throw new Error('El oficio no existe');
      office.isDeleted = true;
      return await this.officeRepository.save(office);
    } catch (error) {
      console.error('Error al eliminar el oficio', error.message);
      throw new Error('Error al eliminar el oficio');
    }
  }
}
