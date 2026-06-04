import { GetChatSessionQuery } from 'src/domain/port/in/chat-session/get-chat-session.interface.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class GetChatSessionValidator {
  validate(query: GetChatSessionQuery): void {
    DomainValidation.assertPublicId(query.publicId);
  }
}
