import { GetReviewQuery } from 'src/domain/port/in/review/get-review.interface.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class GetReviewValidator {
  validate(query: GetReviewQuery): void {
    DomainValidation.assertPublicId(query.publicId);
  }
}
