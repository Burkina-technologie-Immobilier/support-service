import { BusinessError } from 'src/domain/errors/business.error';
import { CodesError } from 'src/domain/errors/codes.error';
import { CreateReviewCommand } from 'src/domain/port/in/review/create-review.interface.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class CreateReviewValidator {
  validate(command: CreateReviewCommand): void {
    if (!command.branchId?.trim()) {
      throw new BusinessError(CodesError.BRANCH_ID_REQUIRED);
    }
    if (!command.productId?.trim()) {
      throw new BusinessError(CodesError.PRODUCT_ID_REQUIRED);
    }
    if (!command.userId?.trim()) {
      throw new BusinessError(CodesError.USER_ID_REQUIRED);
    }

    DomainValidation.assertUuid(command.branchId, CodesError.UUID_INVALID);
    DomainValidation.assertUuid(command.productId, CodesError.UUID_INVALID);
    DomainValidation.assertUuid(command.userId, CodesError.UUID_INVALID);
    DomainValidation.assertUuid(command.orderId, CodesError.UUID_INVALID);
    DomainValidation.assertRating(command.rating);

    if (command.status !== undefined) {
      DomainValidation.assertReviewStatus(command.status);
    }
  }
}
