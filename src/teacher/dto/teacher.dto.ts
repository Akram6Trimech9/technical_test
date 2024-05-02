import { IsString, IsEmail, MinLength } from 'class-validator';
import { UserDto } from '../../user/dto/user.dto';

export class TeacherDto  extends UserDto{
  @IsString()
  teachingCourses: string;

  @IsString()
  department: string;
}