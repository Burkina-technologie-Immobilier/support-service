import { DeleteReviewQuery } from 'src/domain/port/in/review/delete-review.interface.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class DeleteReviewValidator {
  validate(query: DeleteReviewQuery): void {
    DomainValidation.assertPublicId(query.publicId);
  }
}
