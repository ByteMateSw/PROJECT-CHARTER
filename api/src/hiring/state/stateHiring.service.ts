import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateHiring } from './stateHiring.entity';
import { ResponseMessage } from '../../utils/types/functions.type';
import { stateHiringDTO } from './dto/stateHiring.dto';


@Injectable()
export class StateHiringService {
  constructor(
    @InjectRepository(StateHiring)
    private stateHiringRepository: Repository<StateHiring>,
  ) {}

  /**
   * Creates a new hiring status with the given name.
   * 
   * @param name - The name of the hiring status to create.
   * @returns The newly created hiring status.
   * @throws NotFoundException if a hiring status with the same name already exists.
   * @throws BadRequestException if there was an error while saving the hiring status.
   */
  async createStatusHire(stateHire: stateHiringDTO) {
    const existingHireStatus = await this.getStatusByName(stateHire.name);
    if (existingHireStatus) {
      throw new NotFoundException('Error ya existe un estado con ese nombre');
    }
    const NewStatus= await this.stateHiringRepository.create(stateHire)
    if(!NewStatus){
      throw new BadRequestException('Error al crear estado de contrato')
    }
    const saveStatus = await this.stateHiringRepository.save(NewStatus);
    if(!saveStatus){
      throw new BadRequestException('Error al guardar estado de contrato');
    }
    return saveStatus;
  }

  /**
   * Retrieves the hiring status by name.
   * @param name - The name of the hiring status to retrieve.
   * @returns The hiring status object if found, otherwise throws a BadRequestException.
   */
  async getStatusByName(name: string) {
    const existStatus = await this.stateHiringRepository.findOneBy({ name });
    if(!existStatus){
      throw new BadRequestException('Nombre incorrecto')
    }
    return existStatus;
  }

  /**
   * Deletes a status hire by its ID.
   * @param id - The ID of the status hire to delete.
   * @returns A Promise that resolves to a ResponseMessage indicating the result of the deletion.
   * @throws NotFoundException if the status hire with the given ID does not exist.
   * @throws BadRequestException if there is an error while deleting the status hire.
   */
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

  /**
   * Updates the status of a hire.
   *
   * @param id - The ID of the hire.
   * @param UpdateStateHireDTO - The DTO containing the updated hire state.
   * @returns A Promise that resolves to the updated StateHiring object.
   * @throws NotFoundException if the hire with the given ID does not exist.
   * @throws BadRequestException if there is an error updating the hire status.
   */
  async updateStatusHire(id: number, stateHiringDTO:stateHiringDTO): Promise<StateHiring> {
    const hireFound = await this.stateHiringRepository.findOneBy({ id })
    if (!hireFound) {
      throw new NotFoundException('El estado del contrato no existe')
    }
    const statusUpdate= await this.stateHiringRepository.update(id, stateHiringDTO);
    if(!statusUpdate){
      throw new BadRequestException('Error al actualizar el estado de contrato')
    }
    const updatedState = await this.stateHiringRepository.findOneByOrFail({ id });
    if(!updatedState){
      throw new NotFoundException('Error al encontrar estado')
    }
    return updatedState
  }

  /**
   * Retrieves all state hiring records.
   * @returns A promise that resolves to an array of StateHiring objects.
   * @throws BadRequestException if there is an error retrieving the state hiring records.
   */
  async getAllStateHire():Promise<StateHiring[]>{
    const allState = await this.stateHiringRepository.find()
    if(!allState){
      throw new BadRequestException('Error al traer todos los estados del contrato')
    }
    return allState
  }
}