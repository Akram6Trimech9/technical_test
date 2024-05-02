import { TeacherDto } from 'src/teacher/dto/teacher.dto';
import { Gender } from '../src/user/enums';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';

describe('TeacherController (e2e)', () => {
  const url = `http://localhost:3000/teachers`;
  const mockTeacher: TeacherDto = {
    firstName: 'akram',
    lastName: 'trimech',
    email: 'akram@example.com',
    dateOfBirth: new Date('1990-01-01'),
    gender: Gender.MAlE,
    phoneNumber: '123456789',
    teachingCourses: 'physique',
    department: 'ifno',
  };

  describe('Teachers (POST)', () => {
    it('should create a teacher and return a new teacher', () => {
      return request(url)
        .post('/')
        .set('Accept', 'application/json')
        .send(mockTeacher)
        .expect((response: request.Response) => {
          const {
            firstName,
            lastName,
            email,
            dateOfBirth,
            gender,
            phoneNumber,
            teachingCourses,
            department,
          } = response.body;
        //   expect(firstName).toEqual(mockTeacher.firstName);
        //   expect(lastName).toEqual(mockTeacher.lastName);
        //   expect(email).toEqual(mockTeacher.email);
        //   expect(dateOfBirth).toEqual(mockTeacher.dateOfBirth);
        //   expect(gender).toEqual(mockTeacher.gender);
        //   expect(phoneNumber).toEqual(mockTeacher.phoneNumber);
          expect(teachingCourses).toEqual(mockTeacher.teachingCourses);
          expect(department).toEqual(mockTeacher.department);
        })
        .expect(HttpStatus.CREATED);
    });
  });
});