import { ReviewEntity } from 'src/domain/entities/review.entity';
import { ReviewStatusEnum } from 'src/domain/enums/review-status.enum';
import { GetReviewQuery } from './get-review.interface.port';

export interface UpdateReviewCommand {
  authorName?: string;
  rating?: number;
  title?: string;
  body?: string;
  isVerified?: boolean;
  status?: ReviewStatusEnum;
}

export interface UpdateReviewInterfacePort {
  execute(query: GetReviewQuery, command: UpdateReviewCommand): Promise<ReviewEntity>;
}
