import { Injectable } from '@nestjs/common';
import { ChatMessageBdMapper } from 'src/application/mapper/chat-message/chat-message-bd.mapper';
import { ChatMessageEntity } from 'src/domain/entities/chat-message.entity';
import { ChatMessageRepositoryPort } from 'src/domain/port/out/chat-message.repository.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class ChatMessageRepositoryAdapter implements ChatMessageRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: ChatMessageEntity): Promise<ChatMessageEntity> {
    const data = ChatMessageBdMapper.toPersistence(entity);

    const saved = await this.prisma.chatMessageTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });

    return ChatMessageBdMapper.toDomain(saved);
  }

  async findBySessionId(sessionId: string): Promise<ChatMessageEntity[]> {
    const rows = await this.prisma.chatMessageTable.findMany({
      where: { session_id: sessionId },
      orderBy: { created_at: 'asc' },
    });

    return rows.map(ChatMessageBdMapper.toDomain);
  }
}
