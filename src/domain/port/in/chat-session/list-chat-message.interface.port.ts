import { ChatMessageEntity } from 'src/domain/entities/chat-message.entity';

export interface ListChatMessageQuery {
  sessionPublicId: string;
}

export interface ListChatMessageInterfacePort {
  execute(query: ListChatMessageQuery): Promise<ChatMessageEntity[]>;
}
