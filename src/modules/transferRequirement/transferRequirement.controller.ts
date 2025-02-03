import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTransferRequirementDto } from './transferRequirement.dto';
import { TransferRequirementService } from './transferRequirement.service';

@Controller('transferRequirements')
export class TransferRequirementController {
  constructor(
    private readonly transferRequirementService: TransferRequirementService,
  ) {}

  @Post()
  async create(
    @Body() createTransferRequirementDto: CreateTransferRequirementDto,
  ) {
    return await this.transferRequirementService.create(
      createTransferRequirementDto,
    );
  }

  @Get(':sortOrder')
  async findAll(@Param('sortOrder') sortOrder: 'asc' | 'desc') {
    return await this.transferRequirementService.getAll(sortOrder);
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    return await this.transferRequirementService.delete(uuid);
  }
}
