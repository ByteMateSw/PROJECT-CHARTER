import { IsAlpha } from 'class-validator';
import { User } from '../user/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role as RoleEmun } from '../utils/enums/role.enum';

/**
 * Represents a Role entity.
 */
@Entity()
export class Role {
  /**
   * The unique identifier of the role.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The name of the role.
   */
  @Column({ enum: RoleEmun })
  @IsAlpha()
  name: string;

  /**
   * The users associated with this role.
   */
  @OneToMany(() => User, user => user.role)
  user: User[];
}
