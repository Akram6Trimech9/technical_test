import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
 import { User } from 'src/user/user.entity';
 import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentInterface } from './student.interface';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';


@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly userService: UserService,
  ) {}

  async create( userData : UserDto , studentData:CreateStudentDto  ): Promise<any> {
    const user = await this.userService.createUser(userData)
    const student =await  this.studentRepository.create({...studentData,user:user});
    const studentCreated =   await this.studentRepository.save(student);
    return student
  }

  async findAll(): Promise<StudentInterface[]>{
     const students = await this.studentRepository.find({
       relations: ['user']
    });
   if (!students) {
      throw new NotFoundException('users not found');
    }
    return students;
  }

async updateStudent(id : number , updateUser  : UpdateUserDto) : Promise<any>{
 const isStudent = await this.studentRepository.findOne({
where: { id } ,
relations:['user']
 })

  if(!isStudent){
        throw new NotFoundException('Student Not Found')
  }

  const user   = await this.userService.updateUser(isStudent.user.id,updateUser)

   Object.assign(isStudent , updateUser)

    return await this.studentRepository.save(isStudent)
}
}
