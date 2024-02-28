import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hiring } from './hiring.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { StateHiringService } from './state/stateHiring.service';
import { ResponseMessage } from '../utils/types/functions.type';

@Injectable()
export class HiringService {
  constructor(
    @InjectRepository(Hiring) private hiringRepository: Repository<Hiring>,
    private stateHiringService: StateHiringService,
    private userService: UserService,
  ) {}

  async createHire(contractorId: number, contractedId: number) {
      const [userContractor, userContracted] = await Promise.all([
        this.userService.getUser({ id: contractorId }),
        this.userService.getUser({ id: contractedId }),
      ]);
      if(![userContracted, userContracted]){
        throw new BadRequestException('Error al obtener el id de los usuarios');}
      const newDate = new Date();
      if(!newDate) {
        throw new BadRequestException('Error al crear nueva instancia')
      }
      const pendingState =
        await this.stateHiringService.getStatusByName('Pending');
      if(!pendingState) {
        throw new BadRequestException('Error al obtener el estado de pending');
      }
      const hire = this.hiringRepository.create({
        contractor: userContractor,
        contracted: userContracted,
        dateApplication: newDate,
        state: pendingState,
        historyDate: [{ dateofChange: newDate }],
      });
      if(!hire) {
        throw new BadRequestException('Error al crear contrato con los datos proporcionados')
      }
      const savedHire= await this.hiringRepository.save(hire);
    if(!savedHire) {
      throw new BadRequestException('Error no se pudo guardar correctamente')
    }
    return savedHire
  }

  async getHireById(id: number): Promise<Hiring> {
      const HireById= await this.hiringRepository.findOneByOrFail({ id });
      if(!HireById) throw new NotFoundException('Error al obtener contrato por id')
      return HireById
  }

  async getAllHire(): Promise<Hiring[]> {
    const allHire:Hiring[] = await this.hiringRepository.find();
    if(!allHire) throw new NotFoundException('Error al obtener todos los contratos')
    return allHire
  }

  async deleteHire(id: number): Promise<ResponseMessage> {
    const hire = await this.hiringRepository.findOneBy({ id })
    if (!hire) {
      throw new NotFoundException ('El contrato no existe')
    }
    const hireDelete=await this.hiringRepository.delete(id);
    if(!hireDelete){
        throw new BadRequestException('Error al eliminar el contrato')
      }
      return { message: 'El contrato se ha borrado correctamente' };
  }

  async updateHire(id: number, UpdateHireDTO): Promise<Hiring> {
      const hireFound = await this.hiringRepository.findOneBy({ id })
      if(!hireFound){throw new NotFoundException ('El contrato no existe')
      }
      const hireUpdate = await this.hiringRepository.update(id, UpdateHireDTO);
      if(!hireUpdate) {
        throw new BadRequestException('Error al actualizar contrato')
      }
      const Findhire= await this.hiringRepository.findOneByOrFail({ id });
      if(!Findhire){
        throw new NotFoundException('Error al encontrar el estado en la base')
      }
      return Findhire

  }
}
