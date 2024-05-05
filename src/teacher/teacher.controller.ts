import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Put,
  Param,
  Patch,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { UserDto } from '../user/dto/user.dto';
import { TeacherDto } from './dto/teacher.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherInterface } from './teacher.interface';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('teachers')
@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() teacherDto: TeacherDto) {
    const userData = new UserDto();
    userData.email = teacherDto.email,
      userData.dateOfBirth = teacherDto.dateOfBirth,
      userData.firstName = teacherDto.firstName,
      userData.lastName = teacherDto.lastName,
      userData.gender = teacherDto.gender,
      userData.phoneNumber = teacherDto.phoneNumber;
    const teacherData = new CreateTeacherDto();
      teacherData.department = teacherDto.department,
      teacherData.teachingCourses = teacherDto.teachingCourses;
    return this.teacherService.create(userData, teacherData);
  }


  @Get()
  async getTeachers() : Promise<TeacherInterface[]> {
    return await this.teacherService.findAll();
 }

  @Patch(':teacherId/assign-student/:studentId')
  async assignStudent(@Param('studentId',ParseIntPipe ) studentId : number , @Param('teacherId',ParseIntPipe) teacherId : number ) : Promise<any> {
    return  this.teacherService.asignAStudent(teacherId, studentId);
 }

 @Patch('assign-assignment/:assignmentId')
 async assignAssesment(@Param('assignmentId',ParseIntPipe ) assignmentId : number , @Body('studendsIds') studendsIds : number[] ) : Promise<any> {
   if (!Array.isArray(studendsIds)) {
      throw new BadRequestException('studendsIds must be an array');
    }

     const hasInvalidId = studendsIds.some((id) => isNaN(id));
    if (hasInvalidId) {
      throw new BadRequestException('studendsIds must contain valid student id');
    }

    return await this.teacherService.assignAnAssesmentToStudents(
      assignmentId,
      studendsIds,
    );
  }
}
