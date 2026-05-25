import { ChatSessionTable } from '@prisma/client';
import { ChatSessionEntity } from 'src/domain/entities/chat-session.entity';
import { ChatSessionStatusEnum } from 'src/domain/enums/chat-session-status.enum';

export class ChatSessionBdMapper {
  static toDomain(row: ChatSessionTable): ChatSessionEntity {
    return new ChatSessionEntity({
      id: row.id,
      publicId: row.public_id,
      userId: row.user_id ?? undefined,
      agentId: row.agent_id ?? undefined,
      status: row.status as ChatSessionStatusEnum,
      startedAt: row.started_at,
      closedAt: row.closed_at ?? undefined,
    });
  }

  static toPersistence(entity: ChatSessionEntity) {
    return {
      public_id: entity.publicId,
      user_id: entity.userId ?? null,
      agent_id: entity.agentId ?? null,
      status: entity.status,
      closed_at: entity.closedAt ?? null,
    };
  }
}
