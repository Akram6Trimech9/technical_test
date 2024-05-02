import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, isNotEmpty } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';

export class StudentDto extends UserDto {
  @ApiProperty({
    example: '2024/2025',
    required: true,
  })
  @IsString()
  classYear: string;

  @ApiProperty({
    example: 'A+ , A- , B , C .... ',
    required: true,
  })
  @IsString()
  grade: string;
}
