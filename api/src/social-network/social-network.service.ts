import { BadRequestException, Injectable } from '@nestjs/common';
import { SocialNetworkRepository } from './repository/social.repository';
import { CreateSocialNetworkDTO } from './dto/createSocial.dto';

@Injectable()
export class SocialNetworkService {
  constructor(private socialNetworkRepo: SocialNetworkRepository) {}

  async createSocialNetworks(data: CreateSocialNetworkDTO) {
    try {
      const newSocials = this.socialNetworkRepo.create(data);
      await this.socialNetworkRepo.save(newSocials);
      return newSocials;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
