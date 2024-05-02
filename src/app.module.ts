import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { typeOrmConfig } from './config/typeorm.config';
import { Teacher } from './teacher/teacher.entity';
import { TeacherModule } from './teacher/teacher.module';
import { Student } from './student/student.entity';
import { StudentModule } from './student/student.module';
import { Assignment } from './assignment/entities/assignment.entity';
import { AssignmentResponse } from './assignment/entities/response-assignment.entity';
import { AssignmentModule } from './assignment/assignment.module';
import { GradeAssignment } from './assignment/entities/grade-assignment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({ ...typeOrmConfig, entities: [User,Teacher,Student,Assignment,AssignmentResponse,GradeAssignment] }),
    UserModule,
    TeacherModule,
    StudentModule,
    AssignmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
