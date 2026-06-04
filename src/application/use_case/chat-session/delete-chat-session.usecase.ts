import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import {
  DeleteChatSessionInterfacePort,
  DeleteChatSessionQuery,
} from 'src/domain/port/in/chat-session/delete-chat-session.interface.port';
import { ChatSessionRepositoryPort } from 'src/domain/port/out/chat-session.repository.port';
import { DeleteChatSessionValidator } from 'src/domain/service/validators/chat-session/delete-chat-session.validator';

export class DeleteChatSessionUseCase implements DeleteChatSessionInterfacePort {
  constructor(
    private readonly repository: ChatSessionRepositoryPort,
    private readonly validator: DeleteChatSessionValidator,
  ) {}

  async execute(query: DeleteChatSessionQuery): Promise<void> {
    this.validator.validate(query);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.CHAT_SESSION_NOT_FOUND);
    }

    await this.repository.delete(query.publicId);
  }
}
