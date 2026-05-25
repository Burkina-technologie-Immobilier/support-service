import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ChatSessionStatusEnum } from 'src/domain/enums/chat-session-status.enum';

export class UpdateChatSessionDto {
  @IsOptional() @IsEnum(ChatSessionStatusEnum) status?: ChatSessionStatusEnum;
  @IsOptional() @IsUUID() agentId?: string;
}
