import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notifications{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title:string

    @Column()
    description:string

    @Column()
    creationTime:Date

    @Column()
    expireAt:Date

    @Column({ default: false })
    isDeleted: boolean;

    @ManyToOne(()=>User,(user)=>user.notifications)
    user: User
}