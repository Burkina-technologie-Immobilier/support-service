import { ChatSessionEntity } from 'src/domain/entities/chat-session.entity';
import { ListChatSessionQuery } from '../in/chat-session/list-chat-session.interface.port';

export interface ChatSessionRepositoryPort {
  save(entity: ChatSessionEntity): Promise<ChatSessionEntity>;
  findByPublicId(publicId: string): Promise<ChatSessionEntity | null>;
  findWithPagination(query: ListChatSessionQuery): Promise<{ data: ChatSessionEntity[]; total: number }>;
  delete(publicId: string): Promise<void>;
}
