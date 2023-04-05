import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Services } from '@app/shared';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Services.Auth_Service) private readonly authService: ClientProxy,
  ) {}

  @Post('create-user')
  async createUser(@Body() createUserDTO: CreateUserDto) {
    return this.authService.send({ cmd: 'create-user' }, createUserDTO);
  }
}
