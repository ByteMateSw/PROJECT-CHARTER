import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateHiring } from './stateHiring.entity';

@Injectable()
export class StateHiringService {
  constructor(
    @InjectRepository(StateHiring)
    private stateHiringRepository: Repository<StateHiring>,
  ) {}

  async createStatusHire(name: string) {
    try {
      const existingHireStatus = this.getStatusByName(name);
      if (existingHireStatus) {
        throw new Error('Error ya existe un estado con ese nombre');
      }
      await this.stateHiringRepository.save({ name });
    } catch (error) {
      console.error('Error al crear el estado', error.message);
      throw new Error('Error al crear el estado');
    }
  }

  async getStatusByName(name: string) {
    try {
      const existStatus = await this.stateHiringRepository.findOneBy({ name });
      return existStatus;
    } catch (error) {
      console.error('Error al encontrar el status');
      throw new Error('Error al encontrar el status');
    }
  }
}
