import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import {
  DeleteReviewInterfacePort,
  DeleteReviewQuery,
} from 'src/domain/port/in/review/delete-review.interface.port';
import { ReviewRepositoryPort } from 'src/domain/port/out/review.repository.port';
import { DeleteReviewValidator } from 'src/domain/service/validators/review/delete-review.validator';

export class DeleteReviewUseCase implements DeleteReviewInterfacePort {
  constructor(
    private readonly repository: ReviewRepositoryPort,
    private readonly validator: DeleteReviewValidator,
  ) {}

  async execute(query: DeleteReviewQuery): Promise<void> {
    this.validator.validate(query);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.REVIEW_NOT_FOUND);
    }

    await this.repository.delete(query.publicId);
  }
}
