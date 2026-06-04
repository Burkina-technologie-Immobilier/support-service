import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import { ReviewEntity } from 'src/domain/entities/review.entity';
import { GetReviewQuery } from 'src/domain/port/in/review/get-review.interface.port';
import {
  UpdateReviewCommand,
  UpdateReviewInterfacePort,
} from 'src/domain/port/in/review/update-review.interface.port';
import { ReviewRepositoryPort } from 'src/domain/port/out/review.repository.port';
import { MeublezonePermission } from 'src/domain/enums/meublezone-permission.enum';
import { AccessGuard } from 'src/domain/service/policies/access.guard';
import { ReviewModerationPolicy } from 'src/domain/service/policies/review-moderation.policy';
import { UpdateReviewValidator } from 'src/domain/service/validators/review/update-review.validator';

export class UpdateReviewUseCase implements UpdateReviewInterfacePort {
  constructor(
    private readonly repository: ReviewRepositoryPort,
    private readonly validator: UpdateReviewValidator,
    private readonly access: AccessGuard,
    private readonly reviewModerationPolicy: ReviewModerationPolicy,
  ) {}

  async execute(query: GetReviewQuery, command: UpdateReviewCommand): Promise<ReviewEntity> {
    this.validator.validate(command);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.REVIEW_NOT_FOUND);
    }
    this.access.check({
      permission: command.status
        ? MeublezonePermission.REVIEW_MODERATE
        : MeublezonePermission.REVIEW_WRITE,
      branchId: entity.branchId,
    });
    if (command.status) {
      this.reviewModerationPolicy.assertModerationTransition(entity.status, command.status);
    }

    entity.update({
      authorName: command.authorName?.trim() ?? entity.authorName,
      rating: command.rating ?? entity.rating,
      title: command.title?.trim() ?? entity.title,
      body: command.body?.trim() ?? entity.body,
      isVerified: command.isVerified ?? entity.isVerified,
      status: command.status ?? entity.status,
    });

    return this.repository.save(entity);
  }
}
