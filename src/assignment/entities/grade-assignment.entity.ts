 import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Assignment } from './assignment.entity';
 import { GRADE } from '../enum';
import { Student } from '../../student/student.entity';
import { Teacher } from '../../teacher/teacher.entity';

@Entity()
export class GradeAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  grade: GRADE;

  @ManyToOne(() => Assignment, assignment => assignment.grades)
 @JoinColumn()
  assignment: Assignment;

  @ManyToOne(() => Teacher, Teacher => Teacher.graduatedAssignment)
  greaduatedBy: Teacher;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}
