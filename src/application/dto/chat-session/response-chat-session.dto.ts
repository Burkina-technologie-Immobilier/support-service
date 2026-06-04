import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';
import { ChatSessionStatusEnum } from 'src/domain/enums/chat-session-status.enum';

export class ResponseChatSessionDto {
  @IsNanoId() @IsNotEmpty() publicId!: string;
  @IsOptional() @IsUUID() userId?: string;
  @IsOptional() @IsUUID() agentId?: string;
  @IsEnum(ChatSessionStatusEnum) status!: ChatSessionStatusEnum;
}
