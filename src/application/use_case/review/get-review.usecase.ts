import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import { ReviewEntity } from 'src/domain/entities/review.entity';
import {
  GetReviewInterfacePort,
  GetReviewQuery,
} from 'src/domain/port/in/review/get-review.interface.port';
import { ReviewRepositoryPort } from 'src/domain/port/out/review.repository.port';
import { GetReviewValidator } from 'src/domain/service/validators/review/get-review.validator';

export class GetReviewUseCase implements GetReviewInterfacePort {
  constructor(
    private readonly repository: ReviewRepositoryPort,
    private readonly validator: GetReviewValidator,
  ) {}

  async execute(query: GetReviewQuery): Promise<ReviewEntity> {
    this.validator.validate(query);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.REVIEW_NOT_FOUND);
    }

    return entity;
  }
}
