import { IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  title: string;
  @IsString()
  text: string;
}
