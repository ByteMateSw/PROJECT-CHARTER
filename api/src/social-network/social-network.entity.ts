import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SocialNetwork {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  whatsapp: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  linkedin: string;
}
