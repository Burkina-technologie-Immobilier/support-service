import { ReviewPhotoTable } from '@prisma/client';
import { ReviewPhotoEntity } from 'src/domain/entities/review-photo.entity';

export class ReviewPhotoBdMapper {
  static toDomain(row: ReviewPhotoTable): ReviewPhotoEntity {
    return new ReviewPhotoEntity({
      id: row.id,
      publicId: row.public_id,
      reviewId: row.review_id,
      url: row.url,
      position: row.position,
    });
  }

  static toPersistence(entity: ReviewPhotoEntity) {
    return {
      public_id: entity.publicId,
      review_id: entity.reviewId,
      url: entity.url,
      position: entity.position,
    };
  }
}
