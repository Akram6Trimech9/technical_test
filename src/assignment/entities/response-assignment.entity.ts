// assignment-response.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Assignment } from './assignment.entity';
 import { GRADE } from '../enum';
import { Student } from '../../student/student.entity';

@Entity()
export class AssignmentResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  response: string;

 @Column({
    type: 'enum',
    enum: GRADE,
    default: GRADE.INPROCESS
  })
  grade: GRADE;

  @ManyToOne(() => Assignment, assignment => assignment.responses)
  assignment: Assignment;

  @ManyToOne(() => Student, Student => Student.response)
  student: Student;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}
