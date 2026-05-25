import { TicketTable } from '@prisma/client';
import { TicketEntity } from 'src/domain/entities/ticket.entity';
import { SupportCategoryEnum } from 'src/domain/enums/support-category.enum';
import { TicketPriorityEnum } from 'src/domain/enums/ticket-priority.enum';
import { TicketStatusEnum } from 'src/domain/enums/ticket-status.enum';

export class TicketBdMapper {
  static toDomain(row: TicketTable): TicketEntity {
    return new TicketEntity({
      id: row.id,
      publicId: row.public_id,
      branchId: row.branch_id ?? undefined,
      userId: row.user_id ?? undefined,
      fullName: row.full_name,
      email: row.email,
      phone: row.phone ?? undefined,
      category: row.category as SupportCategoryEnum,
      subject: row.subject,
      message: row.message,
      status: row.status as TicketStatusEnum,
      priority: row.priority as TicketPriorityEnum,
      orderId: row.order_id ?? undefined,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  static toPersistence(entity: TicketEntity) {
    return {
      public_id: entity.publicId,
      branch_id: entity.branchId ?? null,
      user_id: entity.userId ?? null,
      full_name: entity.fullName,
      email: entity.email,
      phone: entity.phone ?? null,
      category: entity.category,
      subject: entity.subject,
      message: entity.message,
      status: entity.status,
      priority: entity.priority,
      order_id: entity.orderId ?? null,
    };
  }
}
