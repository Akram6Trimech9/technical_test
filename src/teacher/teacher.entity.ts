 import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "../user/user.entity";
import { Student } from "../student/student.entity";
import { Assignment } from "../assignment/entities/assignment.entity";
import { GradeAssignment } from "../assignment/entities/grade-assignment.entity";

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teachingCourses: string;

    @Column()
    department: string;

    @OneToOne(() => User, (user) => user.teacher,{cascade: true})
    @JoinColumn()
    user: User;

    @OneToMany(() => Student, (student) => student.teacher)
    students: Student[];


    @OneToMany(() => Assignment, (assignment) => assignment.teacher)
    @JoinColumn()
    assignments: Assignment[];


    @OneToMany(() => GradeAssignment, grade => grade.greaduatedBy)
    @JoinColumn()
    graduatedAssignment: GradeAssignment[];
}
