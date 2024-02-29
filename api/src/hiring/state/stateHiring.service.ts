import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const existingHireStatus = await this.getStatusByName(name);
    if (existingHireStatus) {
      throw new NotFoundException('Error ya existe un estado con ese nombre');
    }
    const saveStatus = await this.stateHiringRepository.save({ name });
    if(!saveStatus){
      throw new BadRequestException('Error al guardar estadod de contrato');
    }
    return saveStatus;

  }

  async getStatusByName(name: string) {
    const existStatus = await this.stateHiringRepository.findOneBy({ name });
    if(!existStatus){
      throw new BadRequestException('nombre incorrecto')
    }
    return existStatus;
  
  }

  async deleteStatusHire(id: number):Promise<ResponseMessage>{
    const deleteStatusHire = await this.stateHiringRepository.findOneBy ({ id })
    if (!deleteStatusHire) {
      throw new NotFoundException ('El estado del contrato no existe')
    }
    const statusDelete = await this.stateHiringRepository.delete(id)
    if(!statusDelete){
      throw new BadRequestException('Error al eliminar el estado');
    }
    return { message: 'El estado del contrato se ha borrado correctamente' };
    
  }

  async updateStatusHire(id: number, UpdateStateHireDTO): Promise<StateHiring> {
    const hireFound = await this.stateHiringRepository.findOneBy({ id })
    if (!hireFound) {
      throw new NotFoundException('El estado del contrato no existe')
    }
    const statusUpdate= await this.stateHiringRepository.update(id, UpdateStateHireDTO);
    if(!statusUpdate){
      throw new BadRequestException('Error al actualizar el estado de contrato')
    }
    const returnState = await this.stateHiringRepository.findOneByOrFail({ id });
    if(!returnState){
      throw new NotFoundException('Error al encontrar estado')
    }
    return returnState
      
  }

  async getAllStateHire():Promise<StateHiring[]>{
    const allState = await this.stateHiringRepository.find()
    if(!allState){
      throw new BadRequestException('Error al traer todos los estados del contrato')
    }
    return allState
    
  }
}