import { DeleteChatSessionQuery } from 'src/domain/port/in/chat-session/delete-chat-session.interface.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class DeleteChatSessionValidator {
  validate(query: DeleteChatSessionQuery): void {
    DomainValidation.assertPublicId(query.publicId);
  }
}
