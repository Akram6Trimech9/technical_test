
import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { UserModule } from '../user/user.module';
import { Student } from '../student/student.entity';
import { Assignment } from '../assignment/entities/assignment.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Teacher,Student,Assignment]),UserModule],
   controllers: [TeacherController],
  providers: [TeacherService],
 })
export class TeacherModule {}
