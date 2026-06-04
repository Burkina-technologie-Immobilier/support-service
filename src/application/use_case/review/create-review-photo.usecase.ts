import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import { ReviewPhotoEntity } from 'src/domain/entities/review-photo.entity';
import { BusinessError } from 'src/domain/errors/business.error';
import { CodesError as DomainCodesError } from 'src/domain/errors/codes.error';
import {
  CreateReviewPhotoCommand,
  CreateReviewPhotoInterfacePort,
} from 'src/domain/port/in/review/create-review-photo.interface.port';
import { PublicIdGeneratorPort } from 'src/domain/port/in/generate-public-id/generator-public-id.port';
import { ReviewPhotoRepositoryPort } from 'src/domain/port/out/review-photo.repository.port';
import { ReviewRepositoryPort } from 'src/domain/port/out/review.repository.port';
import { Url } from 'src/domain/service/policies/url.policies';
import { DomainValidation } from 'src/lib/domain-validation';

export class CreateReviewPhotoUseCase implements CreateReviewPhotoInterfacePort {
  constructor(
    private readonly reviewRepository: ReviewRepositoryPort,
    private readonly photoRepository: ReviewPhotoRepositoryPort,
    private readonly publicIdGenerator: PublicIdGeneratorPort,
  ) {}

  async execute(command: CreateReviewPhotoCommand): Promise<ReviewPhotoEntity> {
    DomainValidation.assertPublicId(command.reviewPublicId);

    if (!command.url?.trim()) {
      throw new BusinessError(DomainCodesError.URL_REQUIRED);
    }

    const urlPolicy = new Url();
    if (!urlPolicy.isValidUrl(command.url.trim())) {
      throw new BusinessError(DomainCodesError.URL_INVALID);
    }

    const review = await this.reviewRepository.findByPublicId(command.reviewPublicId);
    if (!review?.id) {
      throw new ApplicationError(CodesError.REVIEW_NOT_FOUND);
    }

    const entity = new ReviewPhotoEntity({
      publicId: this.publicIdGenerator.generateNanoid(),
      reviewId: review.id,
      url: command.url.trim(),
      position: command.position ?? 0,
    });

    return this.photoRepository.save(entity);
  }
}
