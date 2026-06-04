import { Injectable } from '@nestjs/common';
import { TicketMessageBdMapper } from 'src/application/mapper/ticket/ticket-message-bd.mapper';
import { TicketMessageEntity } from 'src/domain/entities/ticket-message.entity';
import { TicketMessageRepositoryPort } from 'src/domain/port/out/ticket-message.repository.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class TicketMessageRepositoryAdapter implements TicketMessageRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: TicketMessageEntity): Promise<TicketMessageEntity> {
    const data = TicketMessageBdMapper.toPersistence(entity);

    const saved = await this.prisma.ticketMessageTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });

    return TicketMessageBdMapper.toDomain(saved);
  }

  async findByTicketId(ticketId: string): Promise<TicketMessageEntity[]> {
    const rows = await this.prisma.ticketMessageTable.findMany({
      where: { ticket_id: ticketId },
      orderBy: { created_at: 'asc' },
    });

    return rows.map(TicketMessageBdMapper.toDomain);
  }
}
