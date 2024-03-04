import { User } from '../user/user.entity';
import { Province } from '../province/province.entity';

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Represents the City entity of the application.
 * This entity is used to define the shape of the City data,
 * and is used to create a database table for City data.
 */
@Entity()
export class City {
  /**
   * The unique identifier for the City.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The name of the City.
   */
  @Column()
  name: string;

  /**
   * The Province that the City belongs to.
   */
  @ManyToOne(() => Province, (province) => province.cities)
  province: Province;

  /**
   * The users that live in the City.
   */
  @OneToMany(() => User, (user) => user.city)
  users: User[];
}
