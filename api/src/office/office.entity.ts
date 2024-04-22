import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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

}
