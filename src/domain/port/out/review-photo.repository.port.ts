import { ReviewPhotoEntity } from 'src/domain/entities/review-photo.entity';

export interface ReviewPhotoRepositoryPort {
  save(entity: ReviewPhotoEntity): Promise<ReviewPhotoEntity>;
  findByPublicId(publicId: string): Promise<ReviewPhotoEntity | null>;
  findByReviewId(reviewId: string): Promise<ReviewPhotoEntity[]>;
  delete(publicId: string): Promise<void>;
}
