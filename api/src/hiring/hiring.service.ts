import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hiring } from './hiring.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { StateHiringService } from './state/stateHiring.service';
import { ResponseMessage } from '../utils/types/functions.type';
import { UpdateHireDTO } from './dto/uptadeHiring.dto';
import { CreateHiringDTO } from './dto/createHiring.dto';
import { StateEnum } from './enums/state.enum';

@Injectable()
export class HiringService {
  constructor(
    @InjectRepository(Hiring) private hiringRepository: Repository<Hiring>,
    private stateHiringService: StateHiringService,
    private userService: UserService,
  ) {}

  /**
   * Creates a new hiring record.
   *
   * @param contractorId - The ID of the contractor user.
   * @param contractedId - The ID of the contracted user.
   * @returns A Promise that resolves to the created Hiring object.
   * @throws BadRequestException if there is an error obtaining user IDs.
   */
  async createHire(createHiringDTO: CreateHiringDTO): Promise<Hiring> {
    const [userContractor, userContracted] = await Promise.all([
      this.userService.getUserBy({ id: createHiringDTO.contractorId }),
      this.userService.getUserBy({ id: createHiringDTO.contractedId }),
    ]);

    if (!userContractor || !userContracted)
      throw new BadRequestException('Error al obtener el id de los usuarios');

    const pendingState = StateEnum.HIRED;

    const newHiring = this.hiringRepository.create({
      contractor: userContractor,
      contracted: userContracted,
      state: pendingState,
      //historyDate: [{ dateofChange: newDate }],
    });

    return await this.hiringRepository.save(newHiring);
  }

  /**
   * Retrieves all hire contracts.
   * @returns A promise that resolves to an array of `Hiring` objects representing the hire contracts.
   */
  async getAllHire(): Promise<Hiring[]> {
    return await this.hiringRepository.find();
  }

  /**
   * Retrieves a hiring record by its ID.
   *
   * @param id - The ID of the hiring record to retrieve.
   * @returns A Promise that resolves to the hiring record.
   */
  async getHiringById(id: number): Promise<Hiring> {
    return await this.hiringRepository.findOne({
      where: { id },
      relations: { contracted: true, contractor: true },
    });
  }

  /**
   * Updates a hiring record by its ID.
   *
   * @param id - The ID of the hiring record to update.
   * @param updateHiring - The updated hiring record data.
   * @returns A Promise that resolves to the updated hiring record.
   * @throws BadRequestException if the hiring record does not exist.
   */
  async updateHiring(id: number, updateHiring: UpdateHireDTO): Promise<Hiring> {
    const hiring = await this.hiringRepository.findOneBy({ id });
    if (!hiring) throw new BadRequestException('El contrato no existe');

    return await this.hiringRepository.save({ ...hiring, ...updateHiring });
  }

  /**
   * Updates a hiring record by its ID.
   *
   * @param id - The ID of the hiring record to update.
   * @param state - The new hiring state record data.
   * @returns A Promise that resolves to the updated hiring record.
   * @throws BadRequestException if the hiring record does not exist.
   */
  async updateStateHiring(id: number, state: StateEnum): Promise<void> {
    try {
      await this.hiringRepository.update({ id }, { state });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * Deletes a hiring record by its ID.
   *
   * @param id - The ID of the hiring record to delete.
   * @returns A Promise that resolves to a response message indicating the success of the deletion.
   * @throws NotFoundException if no hiring record is found with the specified ID.
   * @throws BadRequestException if there is an error deleting the hiring record.
   */
  async deleteHire(id: number): Promise<ResponseMessage> {
    const hire = await this.hiringRepository.findOneBy({ id });
    if (!hire) {
      throw new NotFoundException('El contrato no existe');
    }

    const hireDelete = await this.hiringRepository.delete(id);
    if (!hireDelete) {
      throw new BadRequestException('Error al eliminar el contrato');
    }

    return { message: 'El contrato se ha borrado correctamente' };
  }
}
