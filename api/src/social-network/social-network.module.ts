import { Module } from '@nestjs/common';
import { SocialNetworkService } from './social-network.service';
import { SocialNetworkController } from './social-network.controller';

@Module({
  providers: [SocialNetworkService],
  controllers: [SocialNetworkController]
})
export class SocialNetworkModule {}
