import { HttpException, HttpStatus } from '@nestjs/common';

export class StudentAlreadyAssignedException extends HttpException {
    constructor() {
        super('Student already exists in teacher students', HttpStatus.BAD_REQUEST);
    }
}
