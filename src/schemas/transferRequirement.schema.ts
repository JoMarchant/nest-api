import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransferRequirementDocument = HydratedDocument<TransferRequirement>;

@Schema()
export class TransferRequirement {
  @Prop({ required: true })
  uuid: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  partnersRequired: string[];

  @Prop({ optional: true })
  maxAmount?: number;

  @Prop({ optional: true })
  minPartners?: number;

  @Prop({ required: true })
  createdAt: Date;
}

export const TransferRequirementsSchema =
  SchemaFactory.createForClass(TransferRequirement);
