import { Test, TestingModule } from '@nestjs/testing';
import { TeacherService } from '../teacher.service';
import { TeacherController } from '../teacher.controller';
import { Gender } from '../../user/enums';
import { NotFoundException } from '@nestjs/common';

describe('TeacherController', () => {
  let controller: TeacherController;
  let service: TeacherService;

  beforeEach(async () => {
    const mockTeacherService = {
      create: jest.fn().mockResolvedValue({
        department: 'info',
        teachingCourses: 'Math',
      }),
        findAll: jest.fn().mockResolvedValue([
        {
          id: 1,
          firstName: 'akram',
          lastName: 'trimech',
          email: 'akram@example.com',
          dateOfBirth: new Date('1990-01-01'),
          gender: Gender.MAlE,
          phoneNumber: '123456789',
          teachingCourses: 'Math',
          department: 'info',
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          dateOfBirth: new Date('1995-02-15'),
          gender: Gender.FEMALE,
          phoneNumber: '987654321',
          teachingCourses: 'English',
          department: 'Arts',
        },
      ]),
     };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [
        {
          provide: TeacherService,
          useValue: mockTeacherService,
        },
      ],
    }).compile();

    controller = module.get<TeacherController>(TeacherController);
    service = module.get<TeacherService>(TeacherService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new teacher', async () => {
      const teacherDto = {
        firstName: 'akram',
        lastName: 'trimech',
        email: 'akram@example.com',
        dateOfBirth: new Date('1990-01-01'),
        gender: Gender.MAlE,
        phoneNumber: '123456789',
        teachingCourses: 'Math',
        department: 'info',
      };

      const result = await controller.create(teacherDto);

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: teacherDto.email,
          dateOfBirth: teacherDto.dateOfBirth,
          firstName: teacherDto.firstName,
          lastName: teacherDto.lastName,
          gender: teacherDto.gender,
          phoneNumber: teacherDto.phoneNumber,
        }),
        expect.objectContaining({
          department: teacherDto.department,
          teachingCourses: teacherDto.teachingCourses,
        }),
      );

      expect(result).toEqual({
        department: 'info',
        teachingCourses: 'Math',
      });
    });
  });
  describe('find', () => {
    it('should return an array of teachers', async () => {
      const result = await controller.getTeachers();
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([
        {
          id: 1,
          firstName: 'akram',
          lastName: 'trimech',
          email: 'akram@example.com',
          dateOfBirth: new Date('1990-01-01'),
          gender: Gender.MAlE,
          phoneNumber: '123456789',
          teachingCourses: 'Math',
          department: 'info',
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          dateOfBirth: new Date('1995-02-15'),
          gender: Gender.FEMALE,
          phoneNumber: '987654321',
          teachingCourses: 'English',
          department: 'Arts',
        },
      ]);
    });
  });
});