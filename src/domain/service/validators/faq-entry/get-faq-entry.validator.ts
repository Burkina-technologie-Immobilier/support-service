import { GetFaqEntryQuery } from 'src/domain/port/in/faq-entry/get-faq-entry.interface.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class GetFaqEntryValidator {
  validate(query: GetFaqEntryQuery): void {
    DomainValidation.assertPublicId(query.publicId);
  }
}
