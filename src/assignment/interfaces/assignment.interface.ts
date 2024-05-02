import { StudentInterface } from "src/student/student.interface";
import { GRADE } from "../enum";
import { TeacherInterface } from "src/teacher/teacher.interface";
import { AssignmentResponseInterface } from "./response.interface";
import { GradeAssignmentInterface } from "./grade.interface";

export interface AssignmentInterface {
  id?: number;
  title: string;
  description: string;
  deadline: Date;
  question: string;
  responses?:AssignmentResponseInterface[]
  students?:StudentInterface[]
  teacher?:TeacherInterface,
  grades?:GradeAssignmentInterface[]
}
