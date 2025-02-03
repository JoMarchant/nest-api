import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transfer, TransfersSchema } from '@/schemas/transfer.schema';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { TransferRequirementModule } from '../transferRequirement/transferRequirement.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transfer.name,
        schema: TransfersSchema,
      },
    ]),
    TransferRequirementModule,
  ],
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}
