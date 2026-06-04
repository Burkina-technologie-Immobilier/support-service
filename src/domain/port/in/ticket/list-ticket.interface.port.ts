import { PaginatedResponse } from 'src/domain/entities/paginated-response.entity';
import { TicketEntity } from 'src/domain/entities/ticket.entity';
import { SupportCategoryEnum } from 'src/domain/enums/support-category.enum';
import { TicketPriorityEnum } from 'src/domain/enums/ticket-priority.enum';
import { TicketStatusEnum } from 'src/domain/enums/ticket-status.enum';

export interface ListTicketQuery {
  page: number;
  limit: number;
  status?: TicketStatusEnum;
  priority?: TicketPriorityEnum;
  category?: SupportCategoryEnum;
  branchId?: string;
  userId?: string;
  email?: string;
}

export interface ListTicketInterfacePort {
  execute(query: ListTicketQuery): Promise<PaginatedResponse<TicketEntity>>;
}
