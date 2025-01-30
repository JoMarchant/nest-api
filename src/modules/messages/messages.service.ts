import { Injectable } from '@nestjs/common';
import { CreateMessageParams } from './dto/create-message.dto';
import { UpdateMessageParams } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from '@/schemas/messages.schema';
import { Model } from 'mongoose';
import { randomUUID } from 'node:crypto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async create(createMessageParams: CreateMessageParams) {
    const uuid = randomUUID();
    return await this.messageModel.create({ ...createMessageParams, uuid });
  }

  async findAll() {
    return await this.messageModel.find();
  }

  async findOne(messageUuid: string) {
    return await this.messageModel.findOne({ uuid: messageUuid });
  }

  async update(updadeMessageParams: UpdateMessageParams) {
    const { uuid, ...updateMessageDto } = updadeMessageParams;
    return await this.messageModel.findOneAndUpdate(
      {
        uuid,
      },
      {
        $set: updateMessageDto,
      },
      {
        new: true,
      },
    );
  }

  async remove(uuid: string) {
    return await this.messageModel.findOneAndDelete({ uuid });
  }

  canAuthorEditMessage(authorEmail: string, message: MessageDocument) {
    return message.authorEmail === authorEmail;
  }
}
