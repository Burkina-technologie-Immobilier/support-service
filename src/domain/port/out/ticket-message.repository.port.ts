import { TicketMessageEntity } from 'src/domain/entities/ticket-message.entity';

export interface TicketMessageRepositoryPort {
  save(entity: TicketMessageEntity): Promise<TicketMessageEntity>;
  findByTicketId(ticketId: string): Promise<TicketMessageEntity[]>;
}
