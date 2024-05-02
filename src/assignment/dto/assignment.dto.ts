import { IsString, IsEmail, MinLength, IsDate } from 'class-validator';
import { GRADE } from '../enum';


 export class AssignmentDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  deadline: Date;

   @IsString()
  question: string;

  @IsString()
  result: GRADE;
}
