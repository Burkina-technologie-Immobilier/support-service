import { TicketMessageEntity } from 'src/domain/entities/ticket-message.entity';

export interface ListTicketMessageQuery {
  ticketPublicId: string;
}

export interface ListTicketMessageInterfacePort {
  execute(query: ListTicketMessageQuery): Promise<TicketMessageEntity[]>;
}
