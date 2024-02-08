import { ImagePost } from 'src/image/imagePost.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'date' })
  creationDate: Date;

  @Column({ default: false })
  itClosed: boolean;
  
  @OneToMany(() => ImagePost, (imagePost) => imagePost.post)
  images: ImagePost[];

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToMany(()=> User)
  @JoinTable()
  suscribers: User[];
}
