import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  MongoDBModule,
  Services,
  SharedModule,
  SharedService,
} from '@app/shared';

@Module({
  imports: [SharedModule, MongoDBModule],
  controllers: [AuthController],
  providers: [
    {
      provide: Services.Auth_Service,
      useClass: AuthService,
    },
    {
      provide: Services.Shared_Service,
      useClass: SharedService,
    },
  ],
})
export class AuthModule {}
