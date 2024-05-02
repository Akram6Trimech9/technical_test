import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
   example: 'akram',
   required: true
})
  @IsString()
    @IsNotEmpty()
  classYear: string;

  @ApiProperty({
   example: 'A+ , A- , B , C .... ',
   required: true
})
  @IsString()
    @IsNotEmpty()
  grade: string;

}