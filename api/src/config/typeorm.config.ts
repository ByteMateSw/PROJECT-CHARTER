import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Province } from '../province/province.entity';
import { Office } from '../office/office.entity';
import { Category } from '../category/Category.entity';
import { Hiring } from '../hiring/Hiring.entity';
import { Review } from '../review/review.entity';
import { City } from '../city/city.entity';
import { Post } from '../post/post.entity';
import { ImagePost } from '../image/imagePost.entity';
import { StateHiring } from '../hiring/state/stateHiring.entity';
import { Role } from '../role/role.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      port: +this.configService.get('database.port'),
      username: this.configService.get('database.user'),
      password: this.configService.get('database.pass'),
      database: this.configService.get('database.name'),
      synchronize: true,
      entities: [
        User,
        Province,
        Office,
        Category,
        Hiring,
        Review,
        City,
        Post,
        ImagePost,
        StateHiring,
        Role,
      ],
    };
  }
}
