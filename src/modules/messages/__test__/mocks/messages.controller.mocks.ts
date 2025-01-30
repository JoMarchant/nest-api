import { MessagesService } from '../../messages.service';

const messagesServiceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  canAuthorEditMessage: jest.fn(),
};

export const messagesControllerProvidersMock = [
  {
    provide: MessagesService,
    useValue: messagesServiceMock,
  },
];
