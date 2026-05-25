import { ReviewEntity } from 'src/domain/entities/review.entity';
import { ListReviewQuery } from '../in/review/list-review.interface.port';

export interface ReviewRepositoryPort {
  save(entity: ReviewEntity): Promise<ReviewEntity>;
  findByPublicId(publicId: string): Promise<ReviewEntity | null>;
  findByProductAndUser(productId: string, userId: string): Promise<ReviewEntity | null>;
  findWithPagination(query: ListReviewQuery): Promise<{ data: ReviewEntity[]; total: number }>;
  delete(publicId: string): Promise<void>;
  incrementHelpfulCount(reviewId: string, delta: number): Promise<void>;
}
