import { Controller, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Services, SharedService } from '@app/shared';
import { CreateUserType } from './types/user.type';

@Controller()
export class AuthController {
  constructor(
    @Inject(Services.Auth_Service)
    private readonly authService: AuthService,
    @Inject(Services.Shared_Service)
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'create-user' })
  async createUser(
    @Ctx() context: RmqContext,
    @Payload() createUser: CreateUserType,
  ) {
    console.log('first');
    this.sharedService.acknowledgeMessage(context);

    return this.authService.createUser(createUser);
  }
}
