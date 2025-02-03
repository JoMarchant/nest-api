import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ArrayMinSize,
  Min,
} from 'class-validator';

export class CreateTransferRequirementDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  partnersRequired: string[];

  @IsNumber()
  @Min(0)
  @IsOptional()
  maxAmount?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  minPartners?: number;
}

export interface CreateTransferRequirementParams {
  name: string;
  partnersRequired: string[];
  maxAmount?: number;
  minPartners?: number;
}
