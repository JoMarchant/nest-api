import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transfer, TransferDocument } from '@/schemas/transfer.schema';
import { TransferRequirementService } from '../transferRequirement/transferRequirement.service';
import { CreateTransferParams } from './transfer.dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class TransferService {
  constructor(
    @InjectModel(Transfer.name)
    private readonly transferModel: Model<Transfer>,

    private readonly transferRequirementService: TransferRequirementService,
  ) {}

  async create(params: CreateTransferParams): Promise<TransferDocument> {
    const uuid = randomUUID();
    const createdAt = new Date();

    const { defaultFlow, flows } = await this.getFlows(params);

    if (flows.length === 0) throw new Error('No approval flows found');

    return await this.transferModel.create({
      ...params,
      defaultApprovalFlow: defaultFlow,
      approvalFlows: flows,
      uuid,
      createdAt,
    });
  }

  async getFlows(
    params: CreateTransferParams,
  ): Promise<{ defaultFlow: string; flows: string[] }> {
    return await this.transferRequirementService.getApprovalFlows(params);
  }
}
