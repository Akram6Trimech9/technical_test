import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  teachingCourses: string;

  @IsString()
  department: string;
}