
import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { UserModule } from '../user/user.module';

@Module({
    imports:[TypeOrmModule.forFeature([Student]),UserModule],
   controllers: [StudentController],
  providers: [StudentService],
 })
export class StudentModule {}
