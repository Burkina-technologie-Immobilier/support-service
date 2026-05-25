import { TicketEntity } from 'src/domain/entities/ticket.entity';

export interface GetTicketQuery {
  publicId: string;
}

export interface GetTicketInterfacePort {
  execute(query: GetTicketQuery): Promise<TicketEntity>;
}
