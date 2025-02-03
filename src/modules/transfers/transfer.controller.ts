import { Body, Controller, Post } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { CreateTransferDto } from './transfer.dto';

@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  async create(@Body() createTransferDto: CreateTransferDto) {
    return await this.transferService.create(createTransferDto);
  }
}
