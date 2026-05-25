import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import { ChatSessionEntity } from 'src/domain/entities/chat-session.entity';
import { ChatSessionStatusEnum } from 'src/domain/enums/chat-session-status.enum';
import { GetChatSessionQuery } from 'src/domain/port/in/chat-session/get-chat-session.interface.port';
import {
  UpdateChatSessionCommand,
  UpdateChatSessionInterfacePort,
} from 'src/domain/port/in/chat-session/update-chat-session.interface.port';
import { ChatSessionRepositoryPort } from 'src/domain/port/out/chat-session.repository.port';
import { UpdateChatSessionValidator } from 'src/domain/service/validators/chat-session/update-chat-session.validator';

export class UpdateChatSessionUseCase implements UpdateChatSessionInterfacePort {
  constructor(
    private readonly repository: ChatSessionRepositoryPort,
    private readonly validator: UpdateChatSessionValidator,
  ) {}

  async execute(query: GetChatSessionQuery, command: UpdateChatSessionCommand): Promise<ChatSessionEntity> {
    this.validator.validate(command);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.CHAT_SESSION_NOT_FOUND);
    }

    const status = command.status ?? entity.status;
    const closedAt =
      command.closedAt ??
      (status === ChatSessionStatusEnum.CLOSED && !entity.closedAt ? new Date() : entity.closedAt);

    entity.update({
      status,
      agentId: command.agentId !== undefined ? command.agentId ?? undefined : entity.agentId,
      closedAt: status === ChatSessionStatusEnum.CLOSED ? closedAt : undefined,
    });

    return this.repository.save(entity);
  }
}
