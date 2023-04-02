import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AppService } from './app.service';
import { Services, SharedModule } from '@app/shared';

@Module({
  imports: [
    SharedModule.registerRmq(
      Services.Auth_Service,
      process.env.RABBITMQ_AUTH_QUEUE,
    ),
  ],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule {}
