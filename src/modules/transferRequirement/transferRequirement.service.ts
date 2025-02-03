import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TransferRequirement,
  TransferRequirementDocument,
} from '@/schemas/transferRequirement.schema';
import { CreateTransferRequirementParams } from './transferRequirement.dto';
import { randomUUID } from 'node:crypto';
import { CreateTransferParams } from '../transfers/transfer.dto';

@Injectable()
export class TransferRequirementService {
  constructor(
    @InjectModel(TransferRequirement.name)
    private readonly transferRequirementModel: Model<TransferRequirement>,
  ) {}

  async getAll(sortOrder: 'asc' | 'desc') {
    return await this.transferRequirementModel.find(
      {},
      {},
      { sort: { createdAt: sortOrder === 'asc' ? 1 : -1 } },
    );
  }

  async create(
    params: CreateTransferRequirementParams,
  ): Promise<TransferRequirementDocument> {
    const uuid = randomUUID();
    const createdAt = new Date();

    return await this.transferRequirementModel.create({
      ...params,
      uuid,
      createdAt,
    });
  }

  async delete(uuid: string) {
    return await this.transferRequirementModel.deleteOne({ uuid });
  }

  async getApprovalFlows(params: CreateTransferParams) {
    const flows = await this.transferRequirementModel.find(
      {
        maxAmount: { $gte: params.amount },
      },
      {},
      { sort: { minPartners: 1 } },
    );

    const withMinParners = flows.filter(
      (flow) => flow.minPartners !== undefined,
    );
    const withoutMinPartners = flows.filter(
      (flow) => flow.minPartners === undefined,
    );

    const mergedFlows = withMinParners.concat(withoutMinPartners);

    return {
      defaultFlow: mergedFlows[0]?.uuid,
      flows: mergedFlows.map((flow) => flow.uuid),
    };
  }
}
