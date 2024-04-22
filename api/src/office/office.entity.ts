import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../category/category.entity';

/**
 * Represents the Office entity of the application.
 */
@Entity()
export class Office {
  /**
   * The unique identifier for the Office.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The name of the Office.
   */
  @Column()
  name: string;

  /**
   * The category of the Office.
   */
  @ManyToOne(() => Category, category => category.offices)
  category: Category;
}
