import { PaginatedResponse } from 'src/domain/entities/paginated-response.entity';
import { ReviewEntity } from 'src/domain/entities/review.entity';
import {
  ListReviewInterfacePort,
  ListReviewQuery,
} from 'src/domain/port/in/review/list-review.interface.port';
import { ReviewRepositoryPort } from 'src/domain/port/out/review.repository.port';

export class ListReviewUseCase implements ListReviewInterfacePort {
  constructor(private readonly repository: ReviewRepositoryPort) {}

  async execute(query: ListReviewQuery): Promise<PaginatedResponse<ReviewEntity>> {
    const { data, total } = await this.repository.findWithPagination(query);
    return {
      data,
      total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit),
    };
  }
}
