import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.create(createMessageDto);
  }

  @Get()
  async findAll() {
    return await this.messagesService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const message = await this.messagesService.findOne(uuid);
    if (!message)
      throw new HttpException('MESSAGE_NOT_FOUND', HttpStatus.NOT_FOUND);

    return message;
  }

  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    const originalMessage = await this.messagesService.findOne(uuid);
    if (!originalMessage)
      throw new HttpException('MESSAGE_NOT_FOUND', HttpStatus.NOT_FOUND);

    const canAuthorEditMessage = this.messagesService.canAuthorEditMessage(
      updateMessageDto.authorEmail,
      originalMessage,
    );
    if (!canAuthorEditMessage)
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);

    const message = await this.messagesService.update({
      uuid,
      ...updateMessageDto,
    });

    return message;
  }

  @Delete(':uuid')
  async remove(@Param('id') uuid: string) {
    // Would need authentication to check if the user is allowed to delete the message...
    return await this.messagesService.remove(uuid);
  }
}
