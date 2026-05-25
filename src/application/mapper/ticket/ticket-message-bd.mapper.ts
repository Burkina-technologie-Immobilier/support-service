import { TicketMessageTable } from '@prisma/client';
import { TicketMessageEntity } from 'src/domain/entities/ticket-message.entity';
import { SenderTypeEnum } from 'src/domain/enums/sender-type.enum';

export class TicketMessageBdMapper {
  static toDomain(row: TicketMessageTable): TicketMessageEntity {
    return new TicketMessageEntity({
      id: row.id,
      publicId: row.public_id,
      ticketId: row.ticket_id,
      senderType: row.sender_type as SenderTypeEnum,
      senderId: row.sender_id ?? undefined,
      body: row.body,
      createdAt: row.created_at,
    });
  }

  static toPersistence(entity: TicketMessageEntity) {
    return {
      public_id: entity.publicId,
      ticket_id: entity.ticketId,
      sender_type: entity.senderType,
      sender_id: entity.senderId ?? null,
      body: entity.body,
    };
  }
}
