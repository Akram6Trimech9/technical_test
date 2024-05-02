 import { Teacher } from "../../teacher/teacher.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany, ManyToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { GRADE } from "../enum";
import { AssignmentResponse } from "./response-assignment.entity";
import { Student } from "../../student/student.entity";
import { GradeAssignment } from "./grade-assignment.entity";

@Entity()
export class Assignment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    deadline: Date;

    @Column()
    question: string;

    // @Column()
    // result : GRADE;
    @ManyToMany(() => Student, student => student.assignments)
    students: Student[];

    @OneToMany(() => AssignmentResponse, response => response.assignment)
    responses: AssignmentResponse[];

    @ManyToOne(() => Teacher, Teacher => Teacher.assignments)
    teacher: Teacher;

    @OneToMany(() => GradeAssignment, grade => grade.assignment)
    grades: GradeAssignment[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

}
