import { Injectable } from '@nestjs/common';
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

  async findAll(): Promise<Office[]> {
    return this.officeRepository.find();
  }

  async findOne(id: number): Promise<Office | undefined> {
    return this.officeRepository.findOneBy({id});
  }
  

  async createOffice(newOfficeData: CreateOfficeDto): Promise<Office> {
    try {
      const office = this.officeRepository.create(newOfficeData);
      await this.officeRepository.save(office);
      return office;
    } catch(error) {
      console.error('Error al crear el oficio', error.message);
      throw new Error('Error al crear el oficio');
    }
  } 

  async updateOffice(id: number, officeData: Partial<Office>): Promise<string> {
    try {
      const officeFound = await this.officeRepository.existsBy({id});
      if (!officeFound)
        throw new Error("El oficio no existe");

      await this.officeRepository.update(id, officeData);
      return "El oficio se ha actualizado correctamente";

    } catch (error) {
      console.error("El oficio no se ha podido actualizar", error.message);
      throw new Error("El oficio no se ha podido actualizar");
    }
  }

  async removeOffice(id: number): Promise<string> {
    try {
      const officeFound = await this.officeRepository.existsBy({id});
      if (!officeFound)
        throw new Error("El oficio no existe");

      await this.officeRepository.delete(id);
      return "El oficio ha sido eliminado";

    } catch (error) {
      console.error("El oficio no se ha podido eliminar", error.message);
      throw new Error("El oficio no se ha podido eliminar");
    }
  }
}
