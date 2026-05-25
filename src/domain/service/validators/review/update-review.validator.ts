import { UpdateReviewCommand } from 'src/domain/port/in/review/update-review.interface.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class UpdateReviewValidator {
  validate(command: UpdateReviewCommand): void {
    if (command.rating !== undefined) {
      DomainValidation.assertRating(command.rating);
    }
    if (command.status !== undefined) {
      DomainValidation.assertReviewStatus(command.status);
    }
  }
}
