import { TicketEntity } from 'src/domain/entities/ticket.entity';
import { ListTicketQuery } from '../in/ticket/list-ticket.interface.port';

export interface TicketRepositoryPort {
  save(entity: TicketEntity): Promise<TicketEntity>;
  findByPublicId(publicId: string): Promise<TicketEntity | null>;
  findWithPagination(query: ListTicketQuery): Promise<{ data: TicketEntity[]; total: number }>;
  delete(publicId: string): Promise<void>;
}
