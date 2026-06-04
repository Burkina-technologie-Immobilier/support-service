import { DeleteFaqEntryQuery } from 'src/domain/port/in/faq-entry/delete-faq-entry.interface.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class DeleteFaqEntryValidator {
  validate(query: DeleteFaqEntryQuery): void {
    DomainValidation.assertPublicId(query.publicId);
  }
}
