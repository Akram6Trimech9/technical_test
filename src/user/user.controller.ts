import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserInterface } from './user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() userData: UserDto) {
    return  this.userService.createUser(userData);
  }
}
