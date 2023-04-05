import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('MONGODB_HOST'),
        port: parseInt(configService.get('MONGODB_PORT')),
        database: configService.get('MONGODB_DB_NAME'),
        // password: 'root',
        // username: 'root',
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
