import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  MongoDBModule,
  REPOSITORIES,
  Services,
  SharedModule,
  SharedService,
  UserEntity,
  UsersRepository,
} from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SharedModule,
    MongoDBModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: Services.Auth_Service,
      useClass: AuthService,
    },
    {
      provide: REPOSITORIES.USER,
      useClass: UsersRepository,
    },
    {
      provide: Services.Shared_Service,
      useClass: SharedService,
    },
  ],
})
export class AuthModule {}
