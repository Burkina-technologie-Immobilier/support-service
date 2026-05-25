import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import { ReviewPhotoEntity } from 'src/domain/entities/review-photo.entity';
import {
  ListReviewPhotoInterfacePort,
  ListReviewPhotoQuery,
} from 'src/domain/port/in/review/list-review-photo.interface.port';
import { ReviewPhotoRepositoryPort } from 'src/domain/port/out/review-photo.repository.port';
import { ReviewRepositoryPort } from 'src/domain/port/out/review.repository.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class ListReviewPhotoUseCase implements ListReviewPhotoInterfacePort {
  constructor(
    private readonly reviewRepository: ReviewRepositoryPort,
    private readonly photoRepository: ReviewPhotoRepositoryPort,
  ) {}

  async execute(query: ListReviewPhotoQuery): Promise<ReviewPhotoEntity[]> {
    DomainValidation.assertPublicId(query.reviewPublicId);

    const review = await this.reviewRepository.findByPublicId(query.reviewPublicId);
    if (!review?.id) {
      throw new ApplicationError(CodesError.REVIEW_NOT_FOUND);
    }

    return this.photoRepository.findByReviewId(review.id);
  }
}
