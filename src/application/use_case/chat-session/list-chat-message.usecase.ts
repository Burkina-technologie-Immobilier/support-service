import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import { ChatMessageEntity } from 'src/domain/entities/chat-message.entity';
import {
  ListChatMessageInterfacePort,
  ListChatMessageQuery,
} from 'src/domain/port/in/chat-session/list-chat-message.interface.port';
import { ChatMessageRepositoryPort } from 'src/domain/port/out/chat-message.repository.port';
import { ChatSessionRepositoryPort } from 'src/domain/port/out/chat-session.repository.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class ListChatMessageUseCase implements ListChatMessageInterfacePort {
  constructor(
    private readonly sessionRepository: ChatSessionRepositoryPort,
    private readonly messageRepository: ChatMessageRepositoryPort,
  ) {}

  async execute(query: ListChatMessageQuery): Promise<ChatMessageEntity[]> {
    DomainValidation.assertPublicId(query.sessionPublicId);

    const session = await this.sessionRepository.findByPublicId(query.sessionPublicId);
    if (!session?.id) {
      throw new ApplicationError(CodesError.CHAT_SESSION_NOT_FOUND);
    }

    return this.messageRepository.findBySessionId(session.id);
  }
}
