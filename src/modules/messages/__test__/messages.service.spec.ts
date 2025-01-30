import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from '../messages.service';
import {
  createMessageParams,
  getMessageMock,
  getMessagesMock,
  messagesServiceProvidersMock,
  updateMessageParams,
} from './mocks/messages.service.mocks';

import { Message, MessageDocument } from '@/schemas/messages.schema';
import { Model } from 'mongoose';

describe('MessagesService', () => {
  let service: MessagesService;
  let messageModelMock: Model<Message>;

  let messageModelCreateMock: jest.SpyInstance;
  let messageModelFindMock: jest.SpyInstance;
  let messageModelFindOneMock: jest.SpyInstance;
  let messageModelFindOneAndUpdateMock: jest.SpyInstance;
  let messageModelFindOneAndDeleteMock: jest.SpyInstance;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesService, ...messagesServiceProvidersMock],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    messageModelMock = module.get<Model<Message>>('MessageModel');

    messageModelCreateMock = jest.spyOn(messageModelMock, 'create');
    messageModelFindMock = jest.spyOn(messageModelMock, 'find');
    messageModelFindOneMock = jest.spyOn(messageModelMock, 'findOne');
    messageModelFindOneAndUpdateMock = jest.spyOn(
      messageModelMock,
      'findOneAndUpdate',
    );
    messageModelFindOneAndDeleteMock = jest.spyOn(
      messageModelMock,
      'findOneAndDelete',
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a message', async () => {
    messageModelCreateMock.mockResolvedValueOnce(createMessageParams);

    const result = await service.create(createMessageParams);
    expect(result).toEqual(createMessageParams);
    expect(messageModelCreateMock).toHaveBeenCalledWith(createMessageParams);
  });

  it('should find all messages', async () => {
    messageModelFindMock.mockResolvedValue(getMessagesMock);

    const result = await service.findAll();
    expect(result).toEqual(getMessagesMock);
    expect(messageModelFindMock).toHaveBeenCalled();
  });

  it('should find one message by uuid', async () => {
    messageModelFindOneMock.mockResolvedValueOnce(getMessageMock);

    const result = await service.findOne('uuid');
    expect(result).toEqual(getMessageMock);
    expect(messageModelFindOneMock).toHaveBeenCalledWith({ uuid: 'uuid' });
  });

  it('should update a message', async () => {
    messageModelFindOneAndUpdateMock.mockResolvedValueOnce(updateMessageParams);
    const result = await service.update(updateMessageParams);
    expect(result).toEqual(updateMessageParams);
    expect(messageModelFindOneAndUpdateMock).toHaveBeenCalledWith(
      { uuid: 'uuid' },
      { $set: { content: 'Updated message' } },
      { new: true },
    );
  });

  it('should remove a message by uuid', async () => {
    messageModelFindOneAndDeleteMock.mockResolvedValueOnce(getMessageMock);

    const result = await service.remove('uuid');
    expect(result).toEqual(getMessageMock);
    expect(messageModelFindOneAndDeleteMock).toHaveBeenCalledWith({
      uuid: 'uuid',
    });
  });

  describe('canAuthorEditMessage', () => {
    it('should return true if emails are equal', () => {
      const messageDoc: MessageDocument = getMessageMock as MessageDocument;
      const result = service.canAuthorEditMessage(
        messageDoc.authorEmail,
        messageDoc,
      );
      expect(result).toBe(true);
    });

    it('should return false if emails are not equal', () => {
      const messageDoc: MessageDocument = getMessageMock as MessageDocument;
      const result = service.canAuthorEditMessage('fake@email.com', messageDoc);
      expect(result).toBe(false);
    });
  });
});
