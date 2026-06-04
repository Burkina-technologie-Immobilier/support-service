import { TicketEntity } from 'src/domain/entities/ticket.entity';
import { SupportCategoryEnum } from 'src/domain/enums/support-category.enum';
export interface CreateTicketCommand {
  branchId?: string;
  userId?: string;
  fullName: string;
  email: string;
  phone?: string;
  category: SupportCategoryEnum;
  subject: string;
  message: string;
  orderId?: string;
}

export interface CreateTicketInterfacePort {
  execute(command: CreateTicketCommand): Promise<TicketEntity>;
}
