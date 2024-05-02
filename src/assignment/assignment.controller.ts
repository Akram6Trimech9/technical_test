import { Body, Controller, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, Res } from "@nestjs/common";
import { AssignmentDto } from "./dto/assignment.dto";
import { AssignmentService } from "./assignment.service";
import { STATUS_CODES } from "http";
import { AssignmentInterface } from "./interfaces/assignment.interface";
import { GRADE } from "./enum";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('assignment , answer , reports ')
@Controller('assignment')
export class AssignmentController {
      constructor(private readonly assignmentService: AssignmentService) {}

  @Post(':teacherId')
   async createAnAssignment(@Param('teacherId',ParseIntPipe) teacherId: number, @Body() assignmentDto: AssignmentDto){
 return this.assignmentService.create(teacherId, assignmentDto)
  }


 @Patch('grade/:teacherId/:assignmentId')
 async gradeAnAssignment(@Param('teacherId',ParseIntPipe) teacherId: number,@Param('assignmentId',ParseIntPipe) assignmentId: number, @Body('grade') grade: GRADE){
 return this.assignmentService.gradeAnAssignment(teacherId, assignmentId,grade)
  }

@Post('answer/:studentId/:assignmentId')
 async answerToAnAssignment(@Param('studentId',ParseIntPipe) studentId: number,@Param('assignmentId',ParseIntPipe) assignmentId: number, @Body('response') response: string){
 return this.assignmentService.answerToAnAnswer(studentId, assignmentId,response)
  }

 @Patch('answer/grade/:assignmentId/:answerId')
 async gradeAnAnswer(@Param('answerId',ParseIntPipe) answerId: number, @Body('grade') grade: GRADE){
 return this.assignmentService.gradeAnAnswer( answerId,grade)
}

@Get('report/:teacherId')
async getReport(@Param('teacherId',ParseIntPipe) teacherId: number,  @Query('date') date: Date){
return await  this.assignmentService.getTeacherReport(teacherId,date)
}

 @Get('report/pdf/:teacherId')
  async getPDF(
    @Param('teacherId',ParseIntPipe) teacherId: number,  @Query('date') date: Date,
    @Res() res: Response,
  ): Promise<void> {
    const buffer = await this.assignmentService.generatePDFReport(teacherId,date)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    })

    res.end(buffer)
  }
}