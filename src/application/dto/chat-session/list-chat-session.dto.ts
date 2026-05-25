import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { ChatSessionStatusEnum } from 'src/domain/enums/chat-session-status.enum';

export class ListChatSessionDto {
  @Type(() => Number) @IsInt() @Min(1) page: number = 1;
  @Type(() => Number) @IsInt() @Min(1) @Max(100) limit: number = 10;
  @IsOptional() @IsEnum(ChatSessionStatusEnum) status?: ChatSessionStatusEnum;
  @IsOptional() @IsUUID() userId?: string;
  @IsOptional() @IsUUID() agentId?: string;
}
