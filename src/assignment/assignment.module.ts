
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
 import { Assignment } from './entities/assignment.entity';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { AssignmentResponse } from './entities/response-assignment.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { GradeAssignment } from './entities/grade-assignment.entity';
import { Student } from 'src/student/student.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Assignment,AssignmentResponse,Teacher,GradeAssignment,Student]),],
   controllers: [AssignmentController],
  providers: [AssignmentService],
 })
export class AssignmentModule {}
