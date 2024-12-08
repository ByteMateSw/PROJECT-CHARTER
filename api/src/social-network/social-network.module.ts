import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialNetworkService } from './social-network.service';
import { SocialNetworkController } from './social-network.controller';
import { SocialNetwork } from './social-network.entity';
import { SocialNetworkRepository } from './repository/social.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SocialNetwork, SocialNetworkRepository])],
  providers: [SocialNetworkService],
  controllers: [SocialNetworkController],
})
export class SocialNetworkModule {}
