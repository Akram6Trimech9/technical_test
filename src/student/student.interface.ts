import { AssignmentInterface } from "src/assignment/interfaces/assignment.interface";
import { AssignmentResponseInterface } from "src/assignment/interfaces/response.interface";
import { TeacherInterface } from "src/teacher/teacher.interface";
import { UserInterface } from "src/user/user.interface";

export interface StudentInterface {
  id?: number;
  classYear: string;
  grade: string;
  user?:  UserInterface ;
  teacher?:TeacherInterface;
  assignments?:AssignmentInterface[] ;
  response?:AssignmentResponseInterface[]
}
