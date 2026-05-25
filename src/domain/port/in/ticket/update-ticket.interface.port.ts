import { TicketEntity } from 'src/domain/entities/ticket.entity';
import { SupportCategoryEnum } from 'src/domain/enums/support-category.enum';
import { TicketPriorityEnum } from 'src/domain/enums/ticket-priority.enum';
import { TicketStatusEnum } from 'src/domain/enums/ticket-status.enum';
import { GetTicketQuery } from './get-ticket.interface.port';

export interface UpdateTicketCommand {
  branchId?: string | null;
  userId?: string | null;
  fullName?: string;
  email?: string;
  phone?: string | null;
  category?: SupportCategoryEnum;
  subject?: string;
  message?: string;
  status?: TicketStatusEnum;
  priority?: TicketPriorityEnum;
  orderId?: string | null;
}

export interface UpdateTicketInterfacePort {
  execute(query: GetTicketQuery, command: UpdateTicketCommand): Promise<TicketEntity>;
}
