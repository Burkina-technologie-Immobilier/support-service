import { ReviewEntity } from 'src/domain/entities/review.entity';
import { ReviewStatusEnum } from 'src/domain/enums/review-status.enum';

export interface CreateReviewCommand {
  branchId: string;
  productId: string;
  userId: string;
  authorName?: string;
  rating: number;
  title?: string;
  body?: string;
  isVerified?: boolean;
  orderId?: string;
  status?: ReviewStatusEnum;
}

export interface CreateReviewInterfacePort {
  execute(command: CreateReviewCommand): Promise<ReviewEntity>;
}
