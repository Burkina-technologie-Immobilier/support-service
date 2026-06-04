import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import { ChatSessionEntity } from 'src/domain/entities/chat-session.entity';
import {
  GetChatSessionInterfacePort,
  GetChatSessionQuery,
} from 'src/domain/port/in/chat-session/get-chat-session.interface.port';
import { ChatSessionRepositoryPort } from 'src/domain/port/out/chat-session.repository.port';
import { GetChatSessionValidator } from 'src/domain/service/validators/chat-session/get-chat-session.validator';

export class GetChatSessionUseCase implements GetChatSessionInterfacePort {
  constructor(
    private readonly repository: ChatSessionRepositoryPort,
    private readonly validator: GetChatSessionValidator,
  ) {}

  async execute(query: GetChatSessionQuery): Promise<ChatSessionEntity> {
    this.validator.validate(query);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.CHAT_SESSION_NOT_FOUND);
    }

    return entity;
  }
}
