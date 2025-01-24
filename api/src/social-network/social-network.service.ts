import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialNetworkRepository } from './repository/social.repository';
import { CreateSocialNetworkDTO } from './dto/createSocial.dto';
import { SocialNetwork } from './social-network.entity';
import { UpdateSocialNetworkDTO } from './dto/updateSocial.dto';

@Injectable()
export class SocialNetworkService {
  constructor(
    @InjectRepository(SocialNetwork)
    private socialNetworkRepo: SocialNetworkRepository,
  ) {}

  async createSocialNetworks(data: CreateSocialNetworkDTO) {
    try {
      const socialData: Omit<SocialNetwork, 'id'> = {
        user: data.userId,
        facebook: data.facebook,
        twitter: data.twitter,
        instagram: data.instagram,
        linkedin: data.linkedin,
        web: data.web,
      };
      const newSocials = this.socialNetworkRepo.create(socialData);
      await this.socialNetworkRepo.save(newSocials);
      return newSocials;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getSocialNetwork(userId: number) {
    try {
      const social = await this.socialNetworkRepo.findOneBy({ user: userId });
      return social;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateSocialNetwork(userId: number, data: UpdateSocialNetworkDTO) {
    try {
      await this.socialNetworkRepo.update({ user: userId }, data);
      return {
        ok: true,
        message: 'Social network updated',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
