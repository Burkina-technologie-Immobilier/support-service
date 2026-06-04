import { FaqEntryEntity } from 'src/domain/entities/faq-entry.entity';
import { PaginatedResponse } from 'src/domain/entities/paginated-response.entity';
import { SupportCategoryEnum } from 'src/domain/enums/support-category.enum';

export interface ListFaqEntryQuery {
  page: number;
  limit: number;
  category?: SupportCategoryEnum;
  isPublished?: boolean;
}

export interface ListFaqEntryInterfacePort {
  execute(query: ListFaqEntryQuery): Promise<PaginatedResponse<FaqEntryEntity>>;
}
