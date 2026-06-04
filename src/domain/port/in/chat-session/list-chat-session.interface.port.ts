import { ChatSessionEntity } from 'src/domain/entities/chat-session.entity';
import { PaginatedResponse } from 'src/domain/entities/paginated-response.entity';
import { ChatSessionStatusEnum } from 'src/domain/enums/chat-session-status.enum';

export interface ListChatSessionQuery {
  page: number;
  limit: number;
  status?: ChatSessionStatusEnum;
  userId?: string;
  agentId?: string;
}

export interface ListChatSessionInterfacePort {
  execute(query: ListChatSessionQuery): Promise<PaginatedResponse<ChatSessionEntity>>;
}
