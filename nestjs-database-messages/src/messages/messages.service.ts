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

  async create(message: MessageDto) {
    const newMessage: MessageModel = {
      text: message.text,
      title: message.title,
      id: randomUUID(),
    };
    return await this.messageRepository.save(newMessage);
  }

  async findAll() {
    return await this.messageRepository.find();
  }

  async delete(id: string) {
    return await this.messageRepository.delete({
      id,
    });
  }

  async findOne(id: string) {
    return await this.messageRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByTitle(body: { title: string }) {
    return await this.messageRepository.find({
      where: {
        title: body.title,
      },
    });
  }

  async patchMessage(id: string, dto: MessageDto) {
    return await this.messageRepository.update({ id }, dto);
  }
}
