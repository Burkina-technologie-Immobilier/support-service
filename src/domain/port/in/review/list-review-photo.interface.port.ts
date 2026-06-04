import { ReviewPhotoEntity } from 'src/domain/entities/review-photo.entity';

export interface ListReviewPhotoQuery {
  reviewPublicId: string;
}

export interface ListReviewPhotoInterfacePort {
  execute(query: ListReviewPhotoQuery): Promise<ReviewPhotoEntity[]>;
}
