import { CreateChatSessionCommand } from 'src/domain/port/in/chat-session/create-chat-session.interface.port';
import { CodesError } from 'src/domain/errors/codes.error';
import { DomainValidation } from 'src/lib/domain-validation';

export class CreateChatSessionValidator {
  validate(command: CreateChatSessionCommand): void {
    DomainValidation.assertUuid(command.userId, CodesError.UUID_INVALID);
  }
}
