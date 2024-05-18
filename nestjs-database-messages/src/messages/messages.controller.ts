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
import { UserEmail } from 'src/decorators/user-id.decorator';

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Post('create')
  async create(@Body() message: MessageDto, @UserEmail() email: string) {
    return await this.messageService.create(message, email);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string, @UserEmail() email: string) {
    const deleted = await this.messageService.delete(id, email);
    if (!deleted)
      throw new HttpException(NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    return deleted;
  }

  @Get()
  async findAll(@UserEmail() email: string) {
    return await this.messageService.findAll(email);
  }

  @Get('message/:id')
  async findOne(@Param('id') id: string, @UserEmail() email: string) {
    const messageById = this.messageService.findOne(id, email);
    if (!messageById)
      throw new HttpException(NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    return messageById;
  }

  @Post('message/byTitle')
  @HttpCode(200)
  async findManyByTitle(
    @Body() body: { title: string },
    @UserEmail() email: string,
  ) {
    const messagesByTitle = this.messageService.findByTitle(body, email);
    if (!messagesByTitle)
      throw new HttpException(NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    return messagesByTitle;
  }

  @Patch('message/update/:id')
  async patchMessageById(
    @Param('id') id: string,
    @Body() dto: MessageDto,
    @UserEmail() email: string,
  ) {
    const updated = await this.messageService.patchMessage(id, dto, email);
    if (!updated.affected)
      throw new HttpException(NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    return await this.messageService.findOne(id, email);
  }
}
