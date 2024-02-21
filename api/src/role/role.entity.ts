import { IsAlpha } from 'class-validator';
import { User } from '../user/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role as RoleEmun } from '../utils/enums/role.enum';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: RoleEmun })
  @IsAlpha()
  name: string;

  @OneToMany(() => User, user => user.role)
  user: User[];
}
