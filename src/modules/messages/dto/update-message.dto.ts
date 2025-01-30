import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateMessageDto {
  @IsString()
  @Length(10, 255)
  content: string;

  @IsEmail()
  authorEmail: string;
}

export interface UpdateMessageParams {
  uuid: string;
  content: string;
}
