 import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { Teacher } from "../teacher/teacher.entity";
import { User } from "../user/user.entity";
import { Assignment } from "../assignment/entities/assignment.entity";
import { AssignmentResponse } from "../assignment/entities/response-assignment.entity";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    classYear: string;

    @Column()
    grade: string;

    @OneToOne(() => User, (user) => user.student)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Teacher, (teacher) => teacher.students)
    teacher: Teacher;

    @ManyToMany(() => Assignment, assignment => assignment.students)
     @JoinTable()
     assignments :Assignment[]

    @OneToMany(() => AssignmentResponse, response => response.response)
    response :AssignmentResponse[]
}
