import { ChatSessionEntity } from 'src/domain/entities/chat-session.entity';

export interface GetChatSessionQuery {
  publicId: string;
}

export interface GetChatSessionInterfacePort {
  execute(query: GetChatSessionQuery): Promise<ChatSessionEntity>;
}
