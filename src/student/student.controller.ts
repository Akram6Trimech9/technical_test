import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dto/student.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentInterface } from './student.interface';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The Student has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: StudentDto,
    description: 'Json structure for Student object',
  })
  @UsePipes(ValidationPipe)
  async create(@Body() studentDto: StudentDto) {
    const userData = new UserDto();
    (userData.email = studentDto.email),
      (userData.dateOfBirth = studentDto.dateOfBirth),
      (userData.firstName = studentDto.firstName),
      (userData.lastName = studentDto.lastName),
      (userData.gender = studentDto.gender),
      (userData.phoneNumber = studentDto.phoneNumber);
    const studentData = new CreateStudentDto();
    (studentData.classYear = studentDto.classYear),
      (studentData.grade = studentDto.grade);
    return this.studentService.create(userData, studentData);
  }

  @Get()
  async getTeachers(): Promise<StudentInterface[]> {
    return await this.studentService.findAll();
  }

  @Patch('/:id')
  async updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateStudentDto,
  ): Promise<any> {
    return await this.studentService.updateStudent(id, UpdateStudentDto);
  }
}
