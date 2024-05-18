import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageModel } from './messagesModel/message.entity';
import { Repository, UpdateResult } from 'typeorm';
import { randomUUID } from 'crypto';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageModel)
    private messageRepository: Repository<MessageModel>,
  ) {}

  async create(message: MessageDto, email: string) {
    const newMessage: MessageModel = {
      text: message.text,
      title: message.title,
      id: randomUUID(),
      userEmail: email,
    };
    return await this.messageRepository.save(newMessage);
  }

  async findAll(email: string) {
    return await this.messageRepository.find({
      where: {
        userEmail: email,
      },
    });
  }

  async delete(id: string, email: string) {
    return await this.messageRepository.delete({
      id,
      userEmail: email,
    });
  }

  async findOne(id: string, email: string) {
    return await this.messageRepository.findOne({
      where: {
        id,
        userEmail: email,
      },
    });
  }

  async findByTitle(body: { title: string }, email: string) {
    return await this.messageRepository.find({
      where: {
        title: body.title,
        userEmail: email,
      },
    });
  }

  async patchMessage(id: string, dto: MessageDto, email: string) {
    return await this.messageRepository.update({ id, userEmail: email }, dto);
  }
}
