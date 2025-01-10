import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from './experience.entity';
import { CreateExperienceDTO, UpdateExperienceDTO } from './dto/experience.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
    private userService: UserService,
  ) {}

  async createExperience(
    newExperience: CreateExperienceDTO,
  ): Promise<Experience> {
    const user = await this.userService.getUserBy({ id: newExperience.userId });
    if (!user) {
      throw new NotFoundException(
        `Usuario con ID ${newExperience.userId} no encontrado`,
      );
    }
    const experience = this.experienceRepository.create({
      ...newExperience,
      user,
    });
    return await this.experienceRepository.save(experience);
  }

  async getAllExperiences(): Promise<Experience[]> {
    return await this.experienceRepository.find({ relations: ['user'] });
  }

  async getExperienceById(id: number): Promise<Experience> {
    const experience = await this.experienceRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!experience) {
      throw new NotFoundException(`Experiencia con ID ${id} no encontrada`);
    }
    return experience;
  }

  async getExperienceByUserId(id: number): Promise<Experience[]> {
    const experience = await this.experienceRepository.find({
      relations: ['user'],
      where: { user: { id } },
    });
    if (!experience) {
      throw new NotFoundException(`Experiencia con UserID ${id} no encontrada`);
    }
    return experience;
  }

  async updateExperience(
    id: number,
    updateExperience: UpdateExperienceDTO,
  ): Promise<Experience> {
    const experience = await this.getExperienceById(id);
    if (updateExperience.userId) {
      const user = await this.userService.getUserBy({
        id: updateExperience.userId,
      });
      if (!user) {
        throw new NotFoundException(
          `Usuario con ID ${updateExperience.userId} no encontrado`,
        );
      }
      experience.user = user;
      console.log(experience);
    }
    Object.assign(experience, updateExperience);
    return await this.experienceRepository.save(experience);
    // try {
    //   await this.experienceRepository.update(id, updateExperience);
    // } catch (error) {
    //   throw new BadRequestException(error);
    // }
  }

  async deleteExperience(id: number): Promise<void> {
    const experience = await this.getExperienceById(id);
    if (!experience) {
      throw new NotFoundException(`Experiencia con ID ${id} no encontrada`);
    }
    await this.experienceRepository.delete(id);
  }
}
