import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TicketBdMapper } from 'src/application/mapper/ticket/ticket-bd.mapper';
import { TicketEntity } from 'src/domain/entities/ticket.entity';
import { ListTicketQuery } from 'src/domain/port/in/ticket/list-ticket.interface.port';
import { TicketRepositoryPort } from 'src/domain/port/out/ticket.repository.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class TicketRepositoryAdapter implements TicketRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: TicketEntity): Promise<TicketEntity> {
    const data = TicketBdMapper.toPersistence(entity);

    const saved = await this.prisma.ticketTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });

    return TicketBdMapper.toDomain(saved);
  }

  async findByPublicId(publicId: string): Promise<TicketEntity | null> {
    const row = await this.prisma.ticketTable.findUnique({
      where: { public_id: publicId },
    });
    return row ? TicketBdMapper.toDomain(row) : null;
  }

  async findWithPagination(
    query: ListTicketQuery,
  ): Promise<{ data: TicketEntity[]; total: number }> {
    const { page, limit, status, priority, category, branchId, userId, email } = query;
    const where: Prisma.TicketTableWhereInput = {};

    if (status) {
      where.status = status;
    }
    if (priority) {
      where.priority = priority;
    }
    if (category) {
      where.category = category;
    }
    if (branchId) {
      where.branch_id = branchId;
    }
    if (userId) {
      where.user_id = userId;
    }
    if (email) {
      where.email = email;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.ticketTable.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.ticketTable.count({ where }),
    ]);

    return { data: data.map(TicketBdMapper.toDomain), total };
  }

  async delete(publicId: string): Promise<void> {
    await this.prisma.ticketTable.delete({ where: { public_id: publicId } });
  }
}
