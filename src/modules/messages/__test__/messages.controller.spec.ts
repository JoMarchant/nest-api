import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from '../messages.controller';
import { MessagesService } from '../messages.service';
import { messagesControllerProvidersMock } from './mocks/messages.controller.mocks';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MessageDocument } from '@/schemas/messages.schema';
import {
  getMessageMock,
  getMessagesMock,
} from './mocks/messages.service.mocks';

describe('MessagesController', () => {
  let controller: MessagesController;
  let messagesService: MessagesService;

  // Mocks
  let messagesServiceCreateMock: jest.SpyInstance;
  let messagesServiceFindAllMock: jest.SpyInstance;
  let messagesServiceFindOneMock: jest.SpyInstance;
  let messagesServiceUpdateMock: jest.SpyInstance;
  let messagesServiceRemoveMock: jest.SpyInstance;
  let messagesServiceCanAuthorEditMessageMock: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: messagesControllerProvidersMock,
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
    messagesService = module.get<MessagesService>(MessagesService);

    // Mocks
    messagesServiceCreateMock = jest.spyOn(messagesService, 'create');
    messagesServiceFindAllMock = jest.spyOn(messagesService, 'findAll');
    messagesServiceFindOneMock = jest.spyOn(messagesService, 'findOne');
    messagesServiceUpdateMock = jest.spyOn(messagesService, 'update');
    messagesServiceRemoveMock = jest.spyOn(messagesService, 'remove');
    messagesServiceCanAuthorEditMessageMock = jest.spyOn(
      messagesService,
      'canAuthorEditMessage',
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a message', async () => {
      const createMessageDto: CreateMessageDto = {
        content: 'Hello',
        authorEmail: 'test@example.com',
      };
      const result: MessageDocument = {
        uuid: '1',
        ...createMessageDto,
      } as MessageDocument;
      messagesServiceCreateMock.mockResolvedValueOnce(result);

      const message = await controller.create(createMessageDto);

      expect(message).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of messages', async () => {
      const result: MessageDocument[] = getMessagesMock as MessageDocument[];
      messagesServiceFindAllMock.mockResolvedValueOnce(result);
      const messages = await controller.findAll();

      expect(messages).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a message', async () => {
      const result: MessageDocument = getMessageMock as MessageDocument;
      messagesServiceFindOneMock.mockResolvedValueOnce(result);

      expect(await controller.findOne('1')).toBe(result);
    });

    it('should throw an exception if message not found', async () => {
      messagesServiceFindOneMock.mockResolvedValueOnce(null);

      await expect(controller.findOne('1')).rejects.toThrow(
        new HttpException('MESSAGE_NOT_FOUND', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('update', () => {
    const updateMessageDto: UpdateMessageDto = {
      content: 'Updated',
      authorEmail: 'test@example.com',
    };
    const originalMessage: MessageDocument = {
      uuid: '1',
      content: 'Hello',
      authorEmail: 'test@example.com',
    } as MessageDocument;
    it('should update a message', async () => {
      const updatedMessage = { uuid: '1', ...updateMessageDto };

      messagesServiceFindOneMock.mockResolvedValueOnce(originalMessage);
      messagesServiceCanAuthorEditMessageMock.mockReturnValueOnce(true);
      messagesServiceUpdateMock.mockResolvedValueOnce(updatedMessage);

      const result = await controller.update('1', updateMessageDto);
      expect(result).toBe(updatedMessage);
    });

    it('should throw an exception if message not found', async () => {
      messagesServiceFindOneMock.mockResolvedValueOnce(null);

      const result = controller.update('1', updateMessageDto);
      await expect(result).rejects.toThrow(
        new HttpException('MESSAGE_NOT_FOUND', HttpStatus.NOT_FOUND),
      );
    });

    it('should throw an exception if unauthorized', async () => {
      messagesServiceFindOneMock.mockResolvedValue(originalMessage);
      messagesServiceCanAuthorEditMessageMock.mockReturnValue(false);

      const result = controller.update('1', updateMessageDto);

      await expect(result).rejects.toThrow(
        new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED),
      );
    });
  });

  describe('remove', () => {
    it('should remove a message', async () => {
      const messageResult: MessageDocument = getMessageMock as MessageDocument;
      messagesServiceRemoveMock.mockResolvedValue(messageResult);

      const result = await controller.remove('1');
      expect(result).toBe(messageResult);
    });
  });
});
