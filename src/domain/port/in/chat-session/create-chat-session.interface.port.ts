import { ChatSessionEntity } from 'src/domain/entities/chat-session.entity';

export interface CreateChatSessionCommand {
  userId?: string;
}

export interface CreateChatSessionInterfacePort {
  execute(command: CreateChatSessionCommand): Promise<ChatSessionEntity>;
}
