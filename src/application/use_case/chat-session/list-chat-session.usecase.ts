import { PaginatedResponse } from 'src/domain/entities/paginated-response.entity';
import { ChatSessionEntity } from 'src/domain/entities/chat-session.entity';
import {
  ListChatSessionInterfacePort,
  ListChatSessionQuery,
} from 'src/domain/port/in/chat-session/list-chat-session.interface.port';
import { ChatSessionRepositoryPort } from 'src/domain/port/out/chat-session.repository.port';

export class ListChatSessionUseCase implements ListChatSessionInterfacePort {
  constructor(private readonly repository: ChatSessionRepositoryPort) {}

  async execute(query: ListChatSessionQuery): Promise<PaginatedResponse<ChatSessionEntity>> {
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
