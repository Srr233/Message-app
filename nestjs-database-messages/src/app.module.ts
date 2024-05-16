import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPgConfig } from './configs/postgres.config';
import { MessageModel } from './messages/messagesModel/message.entity';
import { AuthModule } from './auth/auth.module';
import { UserModel } from './auth/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return getPgConfig(configService, [MessageModel, UserModel]);
      },
    }),
    MessagesModule,
    AuthModule,
  ],
})
export class AppModule {}
