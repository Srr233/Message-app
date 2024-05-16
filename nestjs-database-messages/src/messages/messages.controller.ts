import {
  Body,
  Controller,
  Post,
  Delete,
  Param,
  Get,
  HttpException,
  HttpStatus,
  HttpCode,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageDto } from './dto/message.dto';
import { NOT_FOUND_MESSAGE } from './messages.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Post('create')
  async create(@Body() message: MessageDto) {
    return await this.messageService.create(message);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    const deleted = await this.messageService.delete(id);
    if (!deleted)
      throw new HttpException(NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    return deleted;
  }

  @Get()
  async findAll() {
    return await this.messageService.findAll();
  }

  @Get('message/:id')
  async findOne(@Param('id') id: string) {
    const messageById = this.messageService.findOne(id);
    if (!messageById)
      throw new HttpException(NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    return messageById;
  }

  @Post('message/byTitle')
  @HttpCode(200)
  async findManyByTitle(@Body() body: { title: string }) {
    const messagesByTitle = this.messageService.findByTitle(body);
    if (!messagesByTitle)
      throw new HttpException(NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    return messagesByTitle;
  }

  @Patch('message/update/:id')
  async patchMessageById(@Param('id') id: string, @Body() dto: MessageDto) {
    const updated = await this.messageService.patchMessage(id, dto);
    if (!updated.affected)
      throw new HttpException(NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    return await this.messageService.findOne(id);
  }
}
