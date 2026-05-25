import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import { ChatMessageEntity } from 'src/domain/entities/chat-message.entity';
import { BusinessError } from 'src/domain/errors/business.error';
import { CodesError as DomainCodesError } from 'src/domain/errors/codes.error';
import {
  CreateChatMessageCommand,
  CreateChatMessageInterfacePort,
} from 'src/domain/port/in/chat-session/create-chat-message.interface.port';
import { PublicIdGeneratorPort } from 'src/domain/port/in/generate-public-id/generator-public-id.port';
import { ChatMessageRepositoryPort } from 'src/domain/port/out/chat-message.repository.port';
import { ChatSessionRepositoryPort } from 'src/domain/port/out/chat-session.repository.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class CreateChatMessageUseCase implements CreateChatMessageInterfacePort {
  constructor(
    private readonly sessionRepository: ChatSessionRepositoryPort,
    private readonly messageRepository: ChatMessageRepositoryPort,
    private readonly publicIdGenerator: PublicIdGeneratorPort,
  ) {}

  async execute(command: CreateChatMessageCommand): Promise<ChatMessageEntity> {
    DomainValidation.assertPublicId(command.sessionPublicId);
    DomainValidation.assertSenderType(command.senderType, true);

    if (!command.body?.trim()) {
      throw new BusinessError(DomainCodesError.BODY_REQUIRED);
    }

    const session = await this.sessionRepository.findByPublicId(command.sessionPublicId);
    if (!session?.id) {
      throw new ApplicationError(CodesError.CHAT_SESSION_NOT_FOUND);
    }

    const entity = new ChatMessageEntity({
      publicId: this.publicIdGenerator.generateNanoid(),
      sessionId: session.id,
      senderType: command.senderType,
      body: command.body.trim(),
    });

    return this.messageRepository.save(entity);
  }
}
