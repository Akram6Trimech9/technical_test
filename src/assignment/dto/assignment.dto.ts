import { IsString, IsEmail, MinLength, IsDate, IsNotEmpty, IsEnum } from 'class-validator';
import { GRADE } from '../enum';


 export class AssignmentDto {
  @IsString()
    @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  deadline: Date;

   @IsString()
     @IsNotEmpty()
  question: string;

  @IsString()
    @IsEnum(GRADE)
  result: GRADE;
}
