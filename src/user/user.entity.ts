  import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";
import { Gender } from "./enums";
import { Teacher } from "../teacher/teacher.entity";
import { Student } from "../student/student.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email : string ;

    @Column()
    dateOfBirth : Date ;

    @Column()
    gender: Gender

    @Column()
    phoneNumber:string ;

    @OneToOne(() => Teacher, (teacher) => teacher.user)
    teacher: Teacher


    @OneToOne(() => Student, (student) => student.user)
    student: Student

}