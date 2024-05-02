import { Assignment } from '../entities/assignment.entity';
import { Student } from 'src/student/student.entity';
import { GRADE } from '../enum';
import { AssignmentInterface } from './assignment.interface';
import { StudentInterface } from 'src/student/student.interface';

export interface AssignmentResponseInterface {
  id?: number;
  response: string;
   grade: GRADE;
  assignment: AssignmentInterface;
  student: StudentInterface;
}
