import { PaginatedResponse } from 'src/domain/entities/paginated-response.entity';
import { TicketEntity } from 'src/domain/entities/ticket.entity';
import {
  ListTicketInterfacePort,
  ListTicketQuery,
} from 'src/domain/port/in/ticket/list-ticket.interface.port';
import { TicketRepositoryPort } from 'src/domain/port/out/ticket.repository.port';

export class ListTicketUseCase implements ListTicketInterfacePort {
  constructor(private readonly repository: TicketRepositoryPort) {}

  async execute(query: ListTicketQuery): Promise<PaginatedResponse<TicketEntity>> {
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
