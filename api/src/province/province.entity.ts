import { City } from '../city/city.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Represents a Province entity.
 */
@Entity()
export class Province {
  /**
   * The unique identifier of the province.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The name of the province.
   */
  @Column()
  name: string;

  /**
   * The cities in the province.
   */
  @OneToMany(() => City, (city) => city.province)
  cities: City[];
}
