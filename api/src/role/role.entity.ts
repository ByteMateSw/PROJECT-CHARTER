import { IsAlpha } from "class-validator";
import { User } from "../user/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsAlpha()
    name: string;

    @OneToMany(() => User, (user) => user.role)
    user: User[];
}