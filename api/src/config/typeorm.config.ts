import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config"
import { Injectable } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { Province } from "src/province/province.entity";
import { Office } from "src/office/office.entity";
import { Category } from "src/category/Category.entity";
import { Hiring } from "src/hiring/Hiring.entity";
import { Review } from 'src/review/review.entity';
import { City } from "src/city/city.entity";
import { Post } from 'src/post/post.entity';
import { ImagePost } from 'src/image/imagePost.entity';
import { StateHiring } from "src/hiring/state/stateHiring.entity";
import { Role } from "src/role/role.entity";

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
      ]
    };
  }
}
