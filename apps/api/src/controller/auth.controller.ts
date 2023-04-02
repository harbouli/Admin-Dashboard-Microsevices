import { Controller, Get, Inject, Post } from '@nestjs/common';
import { Services } from '@app/shared';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Services.Auth_Service) private readonly authService: ClientProxy,
  ) {}

  @Post('login')
  createUser() {
    return this.authService.send({ cmd: 'login-user' }, {});
  }
}
