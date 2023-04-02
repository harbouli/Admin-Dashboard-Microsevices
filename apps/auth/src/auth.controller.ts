import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cdm: 'login-user' })
  async login(@Ctx() context: RmqContext) {
    const channel = context.getMessage();
    const orginalMessage = context.getMessage();

    channel.ack(orginalMessage);
    return { User: 'USERNAme' };
  }
}
