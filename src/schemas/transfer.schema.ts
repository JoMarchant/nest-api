import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransferDocument = HydratedDocument<Transfer>;

@Schema()
export class Transfer {
  @Prop({ required: true })
  uuid: string;

  @Prop({ required: true })
  account: string;

  @Prop({ required: true })
  destAccount: string;

  @Prop({ required: true })
  destBank: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ optional: true })
  comment?: number;

  @Prop({ required: true })
  approvalFlows: string[];

  @Prop({ required: true })
  defaultApprovalFlow: string;

  @Prop({ required: true })
  createdAt: Date;
}

export const TransfersSchema = SchemaFactory.createForClass(Transfer);
