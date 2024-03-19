import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Office } from '../office/office.entity';

/**
 * Represents a Category entity.
 */
@Entity()
export class Category {
  /**
   * The unique identifier of the category.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The name of the category.
   */
  @Column()
  name: string;

  /**
   * The offices that belong to the category.
   */
  @OneToMany(() => Office, (office) => office.category)
  offices: Office[];
}
