 import { AssignmentInterface } from "src/assignment/interfaces/assignment.interface";
import {   GradeAssignmentInterface } from "src/assignment/interfaces/grade.interface";
import { StudentInterface } from "src/student/student.interface";
import { UserInterface } from "src/user/user.interface";

export interface TeacherInterface {
  id?: number;
  teachingCourses: string;
  department: string;
  user: UserInterface;
  students?: StudentInterface[];
  assignments?: AssignmentInterface[];
  graduatedAssignment?:GradeAssignmentInterface[]
}
