import { Controller, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { Services, SharedService } from '@app/shared';

@Controller()
export class AuthController {
  constructor(
    @Inject(Services.Auth_Service)
    private readonly authService: AuthService,
    @Inject(Services.Shared_Service)
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cdm: 'login-user' })
  async login(@Ctx() context: RmqContext) {
    const channel = context.getMessage();
    const orginalMessage = context.getMessage();

    channel.ack(orginalMessage);
    return { User: 'USERNAme' };
  }
}
