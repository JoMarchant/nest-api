import {
  IsNumberString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateTransferDto {
  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  account: string;

  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  destAccount: string;

  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  destBank: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  @IsOptional()
  comment?: string;
}

export interface CreateTransferParams {
  account: string;
  destAccount: string;
  destBank: string;
  amount: number;
  comment?: string;
}
