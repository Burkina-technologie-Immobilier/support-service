import { ChatSessionEntity } from 'src/domain/entities/chat-session.entity';
import { ChatSessionStatusEnum } from 'src/domain/enums/chat-session-status.enum';
import {
  CreateChatSessionCommand,
  CreateChatSessionInterfacePort,
} from 'src/domain/port/in/chat-session/create-chat-session.interface.port';
import { PublicIdGeneratorPort } from 'src/domain/port/in/generate-public-id/generator-public-id.port';
import { ChatSessionRepositoryPort } from 'src/domain/port/out/chat-session.repository.port';
import { CreateChatSessionValidator } from 'src/domain/service/validators/chat-session/create-chat-session.validator';

export class CreateChatSessionUseCase implements CreateChatSessionInterfacePort {
  constructor(
    private readonly repository: ChatSessionRepositoryPort,
    private readonly validator: CreateChatSessionValidator,
    private readonly publicIdGenerator: PublicIdGeneratorPort,
  ) {}

  async execute(command: CreateChatSessionCommand): Promise<ChatSessionEntity> {
    this.validator.validate(command);

    const entity = new ChatSessionEntity({
      publicId: this.publicIdGenerator.generateNanoid(),
      userId: command.userId,
      status: ChatSessionStatusEnum.OPEN,
    });

    return this.repository.save(entity);
  }
}
