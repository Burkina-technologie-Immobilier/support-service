import { ChatMessageEntity } from 'src/domain/entities/chat-message.entity';

export interface ChatMessageRepositoryPort {
  save(entity: ChatMessageEntity): Promise<ChatMessageEntity>;
  findBySessionId(sessionId: string): Promise<ChatMessageEntity[]>;
}
