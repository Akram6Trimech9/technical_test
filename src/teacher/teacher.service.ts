import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { User } from '../user/user.entity';
 import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherInterface } from './teacher.interface';
import { Student } from '../student/student.entity';
import { ExternalExceptionsHandler } from '@nestjs/core/exceptions/external-exceptions-handler';
import { StudentAlreadyAssignedException } from '../config/exceptions';
import { Assignment } from '../assignment/entities/assignment.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    private readonly userService: UserService,
  ) {}

  async create( userData : UserDto , teacherData:CreateTeacherDto  ): Promise<any> {
    const user = await this.userService.createUser(userData)
    const teacher =await  this.teacherRepository.create({...teacherData,user:user});
    const teacherCreated =   await this.teacherRepository.save(teacher);
    return teacher
  }

  async findAll(): Promise<TeacherInterface[]>{
     const teachers = await this.teacherRepository.find({
       relations: ['user','students','students.user','assignments','assignments.responses']
    });
   if (!teachers) {
      throw new NotFoundException('users not found');
    }
    return teachers;
  }
async asignAStudent(teacherId: number, studentId: number): Promise<TeacherInterface> {
     const teacher = await this.teacherRepository
        .createQueryBuilder('teacher')
        .where('teacher.id = :teacherId', { teacherId })
        .leftJoinAndSelect('teacher.students', 'student')
        .leftJoinAndSelect('teacher.user', 'teachUser')
        .leftJoinAndSelect('student.user', 'user')
        .getOne();

    if (!teacher) {
        throw new NotFoundException('Teacher not found');
    }
    const student = await this.studentRepository
        .createQueryBuilder('student')
        .where('student.id = :studentId', { studentId })
        .leftJoinAndSelect('student.teacher', 'teacher')
        .getOne();


    if (!student) {
        throw new NotFoundException('Student not found');
    }
      if (student.teacher && student.teacher.id !== teacherId) {
          throw new StudentAlreadyAssignedException()
    }

     teacher.students.push(student);

     return this.teacherRepository.save(teacher);
}


async assignAnAssesmentToStudents(assignmentId: number, stIds: number[]): Promise<any> {
    const assignment = await this.assignmentRepository.findOne({
      where : {id :assignmentId},
     relations :['students']

    });

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }
    const foundedStudents: Student[] = [];
    for (const id of stIds) {
         const student = await this.studentRepository.findOne({
            where: { id : id },
            relations: ['user']
        });

        if (!student) {
            throw new NotFoundException(`Student with id = ${id} not found`);
        }
        foundedStudents.push(student);
    }
     assignment.students = foundedStudents;
    return await  this.assignmentRepository.save(assignment);
}

}
