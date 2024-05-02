import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { AssignmentDto } from './dto/assignment.dto';
import { AssignmentInterface } from './interfaces/assignment.interface';
import { Teacher } from 'src/teacher/teacher.entity';
import { GRADE } from './enum';
import { GradeAssignment } from './entities/grade-assignment.entity';
import { AssignmentResponseInterface } from './interfaces/response.interface';
import { Student } from 'src/student/student.entity';
import { AssignmentResponse } from './entities/response-assignment.entity';
import * as PDFDocument from 'pdfkit'
 @Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(GradeAssignment)
    private readonly gradeAssignmentRepository: Repository<GradeAssignment>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
        @InjectRepository(AssignmentResponse)
    private readonly answerRepository: Repository<AssignmentResponse>,
  ) {}

  async create(
    teacherId: number,
    asssignmentData: AssignmentDto,
  ): Promise<{ assignment: AssignmentInterface; teacher: Teacher }> {
    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
      relations: ['assignments'],
    });
    if (!teacher) {
      throw new NotFoundException('teacher not found');
    }
    const newAssignment = await this.assignmentRepository.save(asssignmentData);
    await teacher.assignments.push(newAssignment);
    const savedTeacher = await this.teacherRepository.save(teacher);
    return { assignment: newAssignment, teacher: savedTeacher };
  }

  async gradeAnAssignment(
    teacherId: number,
    assignmentId: number,
    grade: GRADE,
  ): Promise<any> {
    try {
      const teacher = await this.teacherRepository.findOne({
        where: { id: teacherId },
      });
      if (!teacher) {
        throw new NotFoundException('Teacher not found');
      }
      const assignment = await this.assignmentRepository.findOne({
        where: { id: assignmentId },
      });
      if (!assignment) {
        throw new NotFoundException('Assignment not found');
      }
      const newGraduate = new GradeAssignment();
      newGraduate.grade = grade;
      (newGraduate.assignment = assignment),
        (newGraduate.greaduatedBy = teacher);

      const gradeAssignment =
        await this.gradeAssignmentRepository.save(newGraduate);
      return gradeAssignment;
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async answerToAnAnswer(studentId:number, assignmentId:number,response:string): Promise<AssignmentResponseInterface>{

   try{
     const student = await this.studentRepository.findOne({
        where: { id: studentId },
      });
      if (!student) {
        throw new NotFoundException('Student not found');
      }
      const assignment = await this.assignmentRepository.findOne({
        where: { id: assignmentId },
      });
      if (!assignment) {
        throw new NotFoundException('Assignment not found');
      }
      const newResponse = new AssignmentResponse();
      newResponse.response = response ;
      (newResponse.assignment = assignment),
        (newResponse.student = student);

      const gradeAssignment =   await this.answerRepository.save(newResponse);
      return gradeAssignment;
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }




   async gradeAnAnswer(
    answerId: number,
    grade: GRADE,
  ): Promise<any> {
    try {
      const answer = await this.answerRepository.findOne({
        where: { id: answerId },
      });
      if (!answer) {
        throw new NotFoundException('Answer not found');
      }
    answer.grade =grade
    const updateAnswer=     await this.answerRepository.save(answer);
      return  updateAnswer;
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

 async getTeacherReport(teacherId: number, date: Date): Promise<any> {
  try {
    const report = await this.teacherRepository
      .createQueryBuilder('teacher')
      .leftJoinAndSelect('teacher.assignments', 'assignments')
      .leftJoinAndSelect('assignments.responses', 'responses')
      .leftJoinAndSelect('responses.student', 'student')
      .leftJoinAndSelect('student.user', 'user')
      .where('teacher.id = :teacherId', { teacherId })
      .andWhere('DATE(responses.createdAt) = :date', { date })
      .getMany();

    if (!report) {
      throw new NotFoundException(`Teacher report not found for teacher ID ${teacherId} on date ${date}`);
    }
    const formattedReport = [];
     report.forEach(teacher => {
      teacher.assignments.forEach(assignment => {
          const passedResponses = assignment.responses;
         if (passedResponses.length > 0) {
           const passedInfo = passedResponses.map(response => ({
            userName: `${response.student.user.firstName} ${response.student.user.lastName}`,
            grade: response.grade,
          }));
           const assignmentInfo = `${assignment.title} is passed by  : ${passedInfo.map(info => `${info.userName} with grade ${info.grade}`).join(' And ')}`;
           formattedReport.push(assignmentInfo);
        }
      });
    });

    return formattedReport;
  } catch (error) {
    console.error(`Error fetching teacher report: ${error.message}`);
    throw new InternalServerErrorException('An unexpected error occurred while fetching teacher report');
  }
}

async generatePDFReport(teacherId: number, date: Date): Promise<Buffer> {
    try {
      const report = await this.teacherRepository
        .createQueryBuilder('teacher')
        .leftJoinAndSelect('teacher.assignments', 'assignments')
        .leftJoinAndSelect('assignments.responses', 'responses')
        .leftJoinAndSelect('responses.student', 'student')
        .leftJoinAndSelect('student.user', 'user')
        .where('teacher.id = :teacherId', { teacherId })
        .andWhere('DATE(responses.createdAt) = :date', { date })
        .getMany();

      if (!report) {
        throw new NotFoundException(`Teacher report not found for teacher ID ${teacherId} on date ${date}`);
      }

      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

       doc.text('Teacher Report', { align: 'center' });
      doc.moveDown();

      report.forEach((teacher) => {
        teacher.assignments.forEach((assignment) => {
           doc.text(`Assignment: ${assignment.title}`, { underline: true });
          doc.moveDown();

          const tableHeader = ['Student Name', 'Grade'];
          const colWidths = [200, 100];
          doc.text(tableHeader.join(' | '), { align: 'left' });
          doc.moveDown();

          assignment.responses.forEach((response) => {
            const rowData = [
              `${response.student.user.firstName} ${response.student.user.lastName}`,
              response.grade.toString(),
            ];
            doc.text(rowData.join(' | '), { align: 'left' });
            doc.moveDown();
             doc.text(rowData.join(' | '), { align: 'left' });

          });

          doc.moveDown();
        });
      });
      doc.end();
      return new Promise((resolve) => {
        const buffers: Buffer[] = [];
        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
      });
    } catch (error) {
      console.error(`Error  PDF report: ${error.message}`);
      throw new InternalServerErrorException('An unexpected error ');
    }
  }
   }
