import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import {
  DeleteReviewPhotoInterfacePort,
  DeleteReviewPhotoQuery,
} from 'src/domain/port/in/review/delete-review-photo.interface.port';
import { ReviewPhotoRepositoryPort } from 'src/domain/port/out/review-photo.repository.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class DeleteReviewPhotoUseCase implements DeleteReviewPhotoInterfacePort {
  constructor(private readonly photoRepository: ReviewPhotoRepositoryPort) {}

  async execute(query: DeleteReviewPhotoQuery): Promise<void> {
    DomainValidation.assertPublicId(query.publicId);

    const entity = await this.photoRepository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.REVIEW_PHOTO_NOT_FOUND);
    }

    await this.photoRepository.delete(query.publicId);
  }
}
