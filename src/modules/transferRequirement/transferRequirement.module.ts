import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TransferRequirement,
  TransferRequirementsSchema,
} from '@/schemas/transferRequirement.schema';
import { TransferRequirementController } from './transferRequirement.controller';
import { TransferRequirementService } from './transferRequirement.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TransferRequirement.name,
        schema: TransferRequirementsSchema,
      },
    ]),
  ],
  controllers: [TransferRequirementController],
  providers: [TransferRequirementService],
  exports: [TransferRequirementService],
})
export class TransferRequirementModule {}
