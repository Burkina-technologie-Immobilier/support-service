import { BusinessError } from 'src/domain/errors/business.error';
import { CodesError } from 'src/domain/errors/codes.error';
import { ReviewStatusEnum } from 'src/domain/enums/review-status.enum';

export class ReviewModerationPolicy {
  assertModerationTransition(current: ReviewStatusEnum, next: ReviewStatusEnum): void {
    if (current === next) {
      return;
    }
    if (current === ReviewStatusEnum.PUBLISHED && next === ReviewStatusEnum.PENDING) {
      throw new BusinessError(CodesError.REVIEW_STATUS_INVALID, { from: current, to: next });
    }
    const allowed = [
      ReviewStatusEnum.PENDING,
      ReviewStatusEnum.PUBLISHED,
      ReviewStatusEnum.REJECTED,
    ];
    if (!allowed.includes(next)) {
      throw new BusinessError(CodesError.REVIEW_STATUS_INVALID, { next });
    }
  }
}
