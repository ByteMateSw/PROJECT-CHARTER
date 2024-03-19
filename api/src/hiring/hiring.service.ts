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

@Injectable()
export class HiringService {
  constructor(
    @InjectRepository(Hiring) private hiringRepository: Repository<Hiring>,
    private stateHiringService: StateHiringService,
    private userService: UserService,
  ) { }

  /**
   * Creates a new hiring record.
   *
   * @param contractorId - The ID of the contractor user.
   * @param contractedId - The ID of the contracted user.
   * @returns A Promise that resolves to the created Hiring object.
   * @throws BadRequestException if there is an error obtaining user IDs, creating a new instance,
   *                             getting the 'Pending' status, creating the hiring contract, or saving it.
   */
  async createHire(createHiringDTO: CreateHiringDTO): Promise<Hiring> {
    const [userContractor, userContracted] = await Promise.all([
      this.userService.getUser({ id: createHiringDTO.contractorId }),
      this.userService.getUser({ id: createHiringDTO.contractedId }),
    ]);

    if (!userContractor || !userContracted) {
      throw new BadRequestException('Error al obtener el id de los usuarios');
    }

    const newDate = new Date();

    if (!newDate) {
      throw new BadRequestException('Error al crear nueva instancia');
    }

    const pendingState =
      await this.stateHiringService.getStatusByName('Pending');

    if (!pendingState) {
      throw new BadRequestException('Error al obtener el estado de pending');
    }

    const hire = this.hiringRepository.create({
      contractor: userContractor,
      contracted: userContracted,
      dateApplication: newDate,
      state: pendingState,
      historyDate: [{ dateofChange: newDate }],
    });

    if (!hire) {
      throw new BadRequestException(
        'Error al crear contrato con los datos proporcionados',
      );
    }

    const savedHire = await this.hiringRepository.save(hire);

    if (!savedHire) {
      throw new BadRequestException('Error no se pudo guardar correctamente');
    }

    return savedHire;
  }

  /**
   * Retrieves all hire contracts.
   * @returns A promise that resolves to an array of `Hiring` objects representing the hire contracts.
   * @throws `NotFoundException` if there was an error retrieving the hire contracts.
   */
  async getAllHire(): Promise<Hiring[]> {
    const allHire: Hiring[] = await this.hiringRepository.find();
    if (!allHire)
      throw new NotFoundException('Error al obtener todos los contratos');
    return allHire;
  }

  /**
   * Retrieves a hiring record by its ID.
   *
   * @param id - The ID of the hiring record to retrieve.
   * @returns A Promise that resolves to the hiring record.
   * @throws NotFoundException if no hiring record is found with the specified ID.
   */
  async getHireById(id: number): Promise<Hiring> {
    const HireById = await this.hiringRepository.findOneByOrFail({ id });
    if (!HireById)
      throw new NotFoundException('Error al obtener contrato por id');
    return HireById;
  }

  /**
   * Updates a hiring record by its ID.
   *
   * @param id - The ID of the hiring record to update.
   * @param updateHireDTO - The updated hiring record data.
   * @returns A Promise that resolves to the updated hiring record.
   * @throws NotFoundException if no hiring record is found with the specified ID.
   * @throws BadRequestException if there is an error updating the hiring record.
   */
  async updateHire(id: number, updateHireDTO: UpdateHireDTO): Promise<Hiring> {
    const hireFound = await this.hiringRepository.findOneBy({ id });
    if (!hireFound) {
      throw new NotFoundException('El contrato no existe');
    }

    const hireUpdate = await this.hiringRepository.update(id, updateHireDTO);
    if (!hireUpdate) {
      throw new BadRequestException('Error al actualizar contrato');
    }

    const findHire = await this.hiringRepository.findOneOrFail({
      where: { id },
    });
    if (!findHire) {
      throw new NotFoundException('Error al encontrar el estado en la base');
    }

    return findHire;
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
