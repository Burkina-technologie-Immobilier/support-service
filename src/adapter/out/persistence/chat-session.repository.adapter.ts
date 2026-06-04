import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ChatSessionBdMapper } from 'src/application/mapper/chat-session/chat-session-bd.mapper';
import { ChatSessionEntity } from 'src/domain/entities/chat-session.entity';
import { ListChatSessionQuery } from 'src/domain/port/in/chat-session/list-chat-session.interface.port';
import { ChatSessionRepositoryPort } from 'src/domain/port/out/chat-session.repository.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class ChatSessionRepositoryAdapter implements ChatSessionRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: ChatSessionEntity): Promise<ChatSessionEntity> {
    const data = ChatSessionBdMapper.toPersistence(entity);

    const saved = await this.prisma.chatSessionTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });

    return ChatSessionBdMapper.toDomain(saved);
  }

  async findByPublicId(publicId: string): Promise<ChatSessionEntity | null> {
    const row = await this.prisma.chatSessionTable.findUnique({
      where: { public_id: publicId },
    });
    return row ? ChatSessionBdMapper.toDomain(row) : null;
  }

  async findWithPagination(
    query: ListChatSessionQuery,
  ): Promise<{ data: ChatSessionEntity[]; total: number }> {
    const { page, limit, status, userId, agentId } = query;
    const where: Prisma.ChatSessionTableWhereInput = {};

    if (status) {
      where.status = status;
    }
    if (userId) {
      where.user_id = userId;
    }
    if (agentId) {
      where.agent_id = agentId;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.chatSessionTable.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { started_at: 'desc' },
      }),
      this.prisma.chatSessionTable.count({ where }),
    ]);

    return { data: data.map(ChatSessionBdMapper.toDomain), total };
  }

  async delete(publicId: string): Promise<void> {
    await this.prisma.chatSessionTable.delete({ where: { public_id: publicId } });
  }
}
