import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hiring } from './hiring.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { StateHiringService } from './state/stateHiring.service';

@Injectable()
export class HiringService {
  constructor(
    @InjectRepository(Hiring) private hiringRepository: Repository<Hiring>,
    private stateHiringService: StateHiringService,
    private userService: UserService
  ) {}

  async createHire(contractorId: number, contractedId: number) {
     try {
      const [userContractor, userContracted] = await Promise.all([
        this.userService.getUserById(contractorId),
        this.userService.getUserById(contractedId),
      ]);
      const pendingState =
        await this.stateHiringService.getStatusByName('Pending');
      const hire = this.hiringRepository.create({
        contractor: userContractor,
        contracted: userContracted,
        dateApplication: new Date(),
        state: pendingState,
      });
      return await this.hiringRepository.save(hire);
    } catch (error) {
      console.error('Error al crear el contrato', error);
      throw new Error('Error al crear el contrato');
    }
  }

  async getHireById(id: number): Promise<Hiring> {
    try {
      return await this.hiringRepository.findOneByOrFail({ id });
    } catch (error) {
      console.error('Error al obtener el contrato por ID:', error);
      throw new Error('Error al obtener el contrato por ID');
    }
  }

  async getAll(): Promise<Hiring[]> {
    try {
      return this.hiringRepository.find();
    } catch (error) {
      console.error(error);
      throw new Error('Error al traer los contratos');
    }
  }

  async deleteHire(id: number): Promise<void> {
    try {
      await this.hiringRepository.delete(id);
    } catch (error) {
      console.error('Error al eliminar el contrato:', error);
      throw new Error('Error al eliminar el contrato');
    }
  }

  async updateHire(id: number, updatedData: Partial<Hiring>): Promise<Hiring> {
    try {
      await this.hiringRepository.update(id, updatedData);
      return await this.hiringRepository.findOneByOrFail({ id });
    } catch (error) {
      console.error('Error al actualizar el contrato:', error);
      throw new Error('Error al actualizar el contrato');
    }
  }
}