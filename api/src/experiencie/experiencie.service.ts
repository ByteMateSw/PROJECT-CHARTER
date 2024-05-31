import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experiencie } from './experiencie.entity';
import { UserService } from 'src/user/user.service';
import { CreateExperiencieDTO } from './dto/experiencie.dto';

@Injectable()
export class ExperiencieService {
  constructor(
    @InjectRepository(Experiencie)
    private experiencieRepository: Repository<Experiencie>,
    private readonly userService: UserService,
  ) {}

  async createExperiencie(
    experiencieDetails: CreateExperiencieDTO,
    userId: number,
  ) {
    const newExperiencie = this.experiencieRepository.create({
      ...experiencieDetails,
      user: { id: userId },
    });

    await this.experiencieRepository.save(newExperiencie);
    return newExperiencie;
  }
}
