import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('MONGODB_URL'),

        autoLoadEntities: true,
        synchronize: true, // shouldn't be used in production - may lose data
      }),

      inject: [ConfigService],
    }),
  ],
})
export class MongoDBModule {}
