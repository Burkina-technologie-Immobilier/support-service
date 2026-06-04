import { ChatSessionEntity } from 'src/domain/entities/chat-session.entity';
import { ChatSessionStatusEnum } from 'src/domain/enums/chat-session-status.enum';
import { GetChatSessionQuery } from './get-chat-session.interface.port';

export interface UpdateChatSessionCommand {
  status?: ChatSessionStatusEnum;
  agentId?: string;
  closedAt?: Date;
}

export interface UpdateChatSessionInterfacePort {
  execute(query: GetChatSessionQuery, command: UpdateChatSessionCommand): Promise<ChatSessionEntity>;
}
