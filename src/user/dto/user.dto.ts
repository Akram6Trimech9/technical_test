import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Gender } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: 'akram',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Trimech',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'Email@yahoo.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;


  @ApiProperty({
    example: '2024-02-05',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty({
    example: 'male Or female',
    required: true,
  })
  @IsEnum(Gender)
  gender: Gender;


   @ApiProperty({
    example: '+216 ... ',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}
