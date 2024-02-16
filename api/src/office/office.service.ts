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
    return await this.officeRepository.find();
  }

  async getOfficeById(id): Promise<Office> {
    return await this.officeRepository.findOne(id);
  }

  async createOffice(newOfficeData: CreateOfficeDto): Promise<Office> {
    try {
      const newOffice = this.officeRepository.create(newOfficeData);
      return await this.officeRepository.save(newOffice);
    } catch (error) {
      throw new Error('Error al crear el oficio');
    }
  }

  async updateOffice(
    id: number,
    updateOfficeData: Partial<CreateOfficeDto>,
  ): Promise<Office> {
    try {
      const officeFound = await this.officeRepository.findOne({where:{id}});
      if (!officeFound) throw new Error('El oficio no existe');
  
      const updateOffice = { ...officeFound, ...updateOfficeData };
      const saveOffice = await this.officeRepository.save(updateOffice);
  
      return saveOffice;
    } catch (error) {
      throw new Error('El oficio no se ha podido actualizar');
    }
  }
  
  async deleteOffice(id: number): Promise<undefined> {
    try {
      const office = await this.officeRepository.findOne({where:{id}});
      if (!office) throw new Error('El oficio no existe');
      await this.officeRepository.delete(office);
      return undefined; 
    } catch (error) {
      throw new Error('Error al eliminar el oficio');
    }
  }
  
  async getOfficeBySearch(name:string):Promise<any>{
    try {
        const officename = await this.officeRepository.findOneBy ({name: name})
        return officename;
    } catch (error) {
      console.log(Error)
      throw new Error ("No se ha encontrado el oficio")
    }
  }

}
