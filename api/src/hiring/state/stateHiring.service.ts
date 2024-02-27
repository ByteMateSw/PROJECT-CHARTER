import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateHiring } from './stateHiring.entity';
import { ResponseMessage } from '../../utils/types/functions.type';

@Injectable()
export class StateHiringService {
  constructor(
    @InjectRepository(StateHiring)
    private stateHiringRepository: Repository<StateHiring>,
  ) {}

  async createStatusHire(name: string) {
    try {
      const existingHireStatus = await this.getStatusByName(name);
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

  async deleteStatusHire(id: number):Promise<ResponseMessage>{
    try {
      const deleteStatusHire = await this.stateHiringRepository.findOneBy ({ id })
      if (!deleteStatusHire) {
        throw new NotFoundException ('El estado del contrato no existe')
      }
      await this.stateHiringRepository.delete(id)
      return { message: 'El estado del contrato se ha borrado correctamente' };
    } catch (error) {
      console.error("Error")
      throw new Error ("Error al borrar el contrato")
    }
  }

  async updateStatusHire(id: number, UpdateStateHireDTO): Promise<StateHiring> {
    try {
      const hireFound = await this.stateHiringRepository.findOneBy({ id })
      if (!hireFound) throw new NotFoundException('El estado del contrato no existe')
      await this.stateHiringRepository.update(id, UpdateStateHireDTO);
      return await this.stateHiringRepository.findOneByOrFail({ id });
    } catch (error) {
      console.error('Error al actualizar el contrato:', error);
      throw new Error('Error al actualizar el contrato');
    }
  }

  async getAllStateHire():Promise<StateHiring[]>{
    try {
      return this.stateHiringRepository.find()
    } catch (error) {
      console.error('Error al traer todos los estados del contrato') 
      throw new Error('Error al traer todos los estados contrato');
    }
  }
}