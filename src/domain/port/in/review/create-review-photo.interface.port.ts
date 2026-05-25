import { ReviewPhotoEntity } from 'src/domain/entities/review-photo.entity';

export interface CreateReviewPhotoCommand {
  reviewPublicId: string;
  url: string;
  position?: number;
}

export interface CreateReviewPhotoInterfacePort {
  execute(command: CreateReviewPhotoCommand): Promise<ReviewPhotoEntity>;
}
