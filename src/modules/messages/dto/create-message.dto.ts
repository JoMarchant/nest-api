import { IsString, Length, IsEmail } from 'class-validator';

export class CreateMessageDto {
  @IsEmail()
  authorEmail: string;

  @IsString()
  @Length(10, 255)
  content: string;
}

export interface CreateMessageParams {
  authorEmail: string;
  content: string;
}
