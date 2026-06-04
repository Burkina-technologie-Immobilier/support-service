import { ChatMessageTable } from '@prisma/client';
import { ChatMessageEntity } from 'src/domain/entities/chat-message.entity';
import { SenderTypeEnum } from 'src/domain/enums/sender-type.enum';

export class ChatMessageBdMapper {
  static toDomain(row: ChatMessageTable): ChatMessageEntity {
    return new ChatMessageEntity({
      id: row.id,
      publicId: row.public_id,
      sessionId: row.session_id,
      senderType: row.sender_type as SenderTypeEnum,
      body: row.body,
      createdAt: row.created_at,
    });
  }

  static toPersistence(entity: ChatMessageEntity) {
    return {
      public_id: entity.publicId,
      session_id: entity.sessionId,
      sender_type: entity.senderType,
      body: entity.body,
    };
  }
}
