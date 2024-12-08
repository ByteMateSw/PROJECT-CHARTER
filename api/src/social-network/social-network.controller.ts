import { Controller, Post, Body, Get, Param, Put, Query } from '@nestjs/common';
import { SocialNetworkService } from './social-network.service';
import { CreateSocialNetworkDTO } from './dto/createSocial.dto';
import { UpdateSocialNetworkDTO } from './dto/updateSocial.dto';

@Controller('social-network')
export class SocialNetworkController {
  constructor(private socialNetworkService: SocialNetworkService) {}

  @Post('/new')
  async createSocialNetworks(@Body() data: CreateSocialNetworkDTO) {
    return await this.socialNetworkService.createSocialNetworks(data);
  }

  @Get('/:userId')
  async getSocialNetwork(@Param('userId') userId: number) {
    return await this.socialNetworkService.getSocialNetwork(userId);
  }

  @Put('/update')
  async updateSocialNetwork(
    @Query('userId') userId: number,
    @Body() data: UpdateSocialNetworkDTO,
  ) {
    return await this.socialNetworkService.updateSocialNetwork(userId, data);
  }
}
