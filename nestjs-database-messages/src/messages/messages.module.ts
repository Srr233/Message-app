import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { MessageModel } from './messagesModel/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageModel])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
