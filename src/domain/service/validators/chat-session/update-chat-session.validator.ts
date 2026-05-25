import { UpdateChatSessionCommand } from 'src/domain/port/in/chat-session/update-chat-session.interface.port';
import { CodesError } from 'src/domain/errors/codes.error';
import { DomainValidation } from 'src/lib/domain-validation';

export class UpdateChatSessionValidator {
  validate(command: UpdateChatSessionCommand): void {
    if (command.status !== undefined) {
      DomainValidation.assertChatStatus(command.status);
    }
    DomainValidation.assertUuid(command.agentId, CodesError.UUID_INVALID);
  }
}
