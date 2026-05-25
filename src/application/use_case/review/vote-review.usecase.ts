import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import { CodesError as DomainCodesError } from 'src/domain/errors/codes.error';
import {
  VoteReviewCommand,
  VoteReviewInterfacePort,
  VoteReviewResult,
} from 'src/domain/port/in/review/vote-review.interface.port';
import { ReviewRepositoryPort } from 'src/domain/port/out/review.repository.port';
import { ReviewVoteRepositoryPort } from 'src/domain/port/out/review-vote.repository.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class VoteReviewUseCase implements VoteReviewInterfacePort {
  constructor(
    private readonly reviewRepository: ReviewRepositoryPort,
    private readonly voteRepository: ReviewVoteRepositoryPort,
  ) {}

  async execute(command: VoteReviewCommand): Promise<VoteReviewResult> {
    DomainValidation.assertPublicId(command.reviewPublicId);
    DomainValidation.assertUuid(command.userId, DomainCodesError.UUID_INVALID);

    const review = await this.reviewRepository.findByPublicId(command.reviewPublicId);
    if (!review?.id) {
      throw new ApplicationError(CodesError.REVIEW_NOT_FOUND);
    }

    const result = await this.voteRepository.upsert(
      review.id,
      command.userId,
      command.isHelpful,
    );

    const delta = this.computeHelpfulDelta(
      result.created,
      result.previousHelpful,
      command.isHelpful,
    );

    if (delta !== 0) {
      await this.reviewRepository.incrementHelpfulCount(review.id, delta);
    }

    return result;
  }

  private computeHelpfulDelta(
    created: boolean,
    previousHelpful: boolean | undefined,
    isHelpful: boolean,
  ): number {
    if (created) {
      return isHelpful ? 1 : 0;
    }

    if (previousHelpful === isHelpful) {
      return 0;
    }

    if (previousHelpful === true && !isHelpful) {
      return -1;
    }

    if (previousHelpful === false && isHelpful) {
      return 1;
    }

    return 0;
  }
}
