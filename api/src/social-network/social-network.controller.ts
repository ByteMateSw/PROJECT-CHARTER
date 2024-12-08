import { Controller, Post, Body } from '@nestjs/common';
import { SocialNetworkService } from './social-network.service';
import { CreateSocialNetworkDTO } from './dto/createSocial.dto';

@Controller('social-network')
export class SocialNetworkController {
  constructor(private socialNetworkService: SocialNetworkService) {}

  @Post('/new')
  async createSocialNetworks(@Body() data: CreateSocialNetworkDTO) {
    return await this.socialNetworkService.createSocialNetworks(data);
  }
}
