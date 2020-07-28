import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({nullable: true})
    photo: string;

    @Column({unique: true})
    email: string;

    @Column({nullable: true})
    age: number;

    @Column()
    password: string;

}
