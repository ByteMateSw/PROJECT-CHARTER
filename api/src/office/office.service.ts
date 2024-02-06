import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Office } from './office.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OfficeService {
  constructor(
    @InjectRepository(Office)
    private readonly officeRepository: Repository<Office>,
  ) {}

  findAll(): Promise<Office[]> {
    return this.officeRepository.find();
  }

  findOne(id: number): Promise<Office | undefined> {
    return this.officeRepository.findOneBy({ id });
  }

  create(officeData: Partial<Office>): Promise<Office> {
    const office = this.officeRepository.create(officeData);
    return this.officeRepository.save(office);
  }

  async update(
    id: number,
    officeData: Partial<Office>,
  ): Promise<Office | undefined> {
    await this.officeRepository.update(id, officeData);
    return this.officeRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.officeRepository.delete(id);
  }
}
