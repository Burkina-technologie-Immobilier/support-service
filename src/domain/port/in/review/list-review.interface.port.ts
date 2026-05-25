import { PaginatedResponse } from 'src/domain/entities/paginated-response.entity';
import { ReviewEntity } from 'src/domain/entities/review.entity';
import { ReviewStatusEnum } from 'src/domain/enums/review-status.enum';

export interface ListReviewQuery {
  page: number;
  limit: number;
  productId?: string;
  branchId?: string;
  status?: ReviewStatusEnum;
  rating?: number;
}

export interface ListReviewInterfacePort {
  execute(query: ListReviewQuery): Promise<PaginatedResponse<ReviewEntity>>;
}
