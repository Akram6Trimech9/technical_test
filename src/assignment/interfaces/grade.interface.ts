import { Teacher } from "src/teacher/teacher.entity";
import { Assignment } from "../entities/assignment.entity";
import { GRADE } from "../enum";

export interface GradeAssignmentInterface{
      id?: number;
  grade: GRADE;
  assignment?: Assignment;
  graduatedBy?: Teacher;
 }