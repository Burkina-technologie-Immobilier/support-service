import { PaginatedResponse } from 'src/domain/entities/paginated-response.entity';
import { FaqEntryEntity } from 'src/domain/entities/faq-entry.entity';
import {
  ListFaqEntryInterfacePort,
  ListFaqEntryQuery,
} from 'src/domain/port/in/faq-entry/list-faq-entry.interface.port';
import { FaqEntryRepositoryPort } from 'src/domain/port/out/faq-entry.repository.port';

export class ListFaqEntryUseCase implements ListFaqEntryInterfacePort {
  constructor(private readonly repository: FaqEntryRepositoryPort) {}

  async execute(query: ListFaqEntryQuery): Promise<PaginatedResponse<FaqEntryEntity>> {
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
