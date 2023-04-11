import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        port:configService.get('MONGODB_PORT'),
        host:configService.get('MONGODB_HOST'),
        password:configService.get('MONGO_ROOT_PASSWORD'),
        username:configService.get('MONGO_ROOT_USER'),
        database:configService.get('MONGO_ROOT_DATABASE'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoLoadEntities: true,
        synchronize: true, // shouldn't be used in production - may lose data
      }),

      inject: [ConfigService],
    }),
  ],
})
export class MongoDBModule {}
