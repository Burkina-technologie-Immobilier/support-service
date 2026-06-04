import { IsOptional, IsUUID } from 'class-validator';

export class CreateChatSessionDto {
  @IsOptional() @IsUUID() userId?: string;
}
