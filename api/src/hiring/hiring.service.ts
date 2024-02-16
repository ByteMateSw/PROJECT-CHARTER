import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Hiring } from './hiring.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { StateHiringService } from './state/stateHiring.service';

@Injectable()
export class HiringService {
  constructor(
    @InjectRepository(Hiring) private hiringRepository: Repository<Hiring>,
    private userService: UserService,
    private stateHiringService: StateHiringService,
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
      console.error('Error al crear el contrato:', error);
      throw new Error('Error al crear el contrato');
    }
  }

  getAll(): Promise<Hiring[]> {
    try {
      return this.hiringRepository.find();
    } catch (error) {
      console.error(error);
      throw new Error('Error al traer los contratos');
    }
  }
}
