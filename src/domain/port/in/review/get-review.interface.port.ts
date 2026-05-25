import { ReviewEntity } from 'src/domain/entities/review.entity';

export interface GetReviewQuery {
  publicId: string;
}

export interface GetReviewInterfacePort {
  execute(query: GetReviewQuery): Promise<ReviewEntity>;
}
