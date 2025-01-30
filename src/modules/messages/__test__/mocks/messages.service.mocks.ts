import { Message } from '@/schemas/messages.schema';
import { getModelToken } from '@nestjs/mongoose';

const messageModelMock = {
  create: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
};

export const messagesServiceProvidersMock = [
  {
    provide: getModelToken(Message.name),
    useValue: messageModelMock,
  },
];

export const createMessageParams = {
  content: 'Test message',
  authorEmail: 'author@author.com',
};

export const updateMessageParams = {
  uuid: 'uuid',
  content: 'Updated message',
};

export const getMessagesMock: Message[] = [
  {
    uuid: 'uuid',
    content: 'Test message',
    authorEmail: 'author@author.com',
  },
  {
    uuid: 'uuid1',
    content: 'Test message1',
    authorEmail: 'author1@author.com',
  },
  {
    uuid: 'uuid2',
    content: 'Test message2',
    authorEmail: 'author2@author.com',
  },
];

export const getMessageMock: Message = {
  uuid: 'uuid',
  content: 'Test message',
  authorEmail: 'author@author.com',
};
