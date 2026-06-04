import { GetTicketQuery } from 'src/domain/port/in/ticket/get-ticket.interface.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class GetTicketValidator {
  validate(query: GetTicketQuery): void {
    DomainValidation.assertPublicId(query.publicId);
  }
}
