import { DeleteTicketQuery } from 'src/domain/port/in/ticket/delete-ticket.interface.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class DeleteTicketValidator {
  validate(query: DeleteTicketQuery): void {
    DomainValidation.assertPublicId(query.publicId);
  }
}
