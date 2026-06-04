import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FaqEntryBdMapper } from 'src/application/mapper/faq-entry/faq-entry-bd.mapper';
import { FaqEntryEntity } from 'src/domain/entities/faq-entry.entity';
import { ListFaqEntryQuery } from 'src/domain/port/in/faq-entry/list-faq-entry.interface.port';
import { FaqEntryRepositoryPort } from 'src/domain/port/out/faq-entry.repository.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class FaqEntryRepositoryAdapter implements FaqEntryRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: FaqEntryEntity): Promise<FaqEntryEntity> {
    const data = FaqEntryBdMapper.toPersistence(entity);

    const saved = await this.prisma.faqEntryTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });

    return FaqEntryBdMapper.toDomain(saved);
  }

  async findByPublicId(publicId: string): Promise<FaqEntryEntity | null> {
    const row = await this.prisma.faqEntryTable.findUnique({
      where: { public_id: publicId },
    });
    return row ? FaqEntryBdMapper.toDomain(row) : null;
  }

  async findWithPagination(
    query: ListFaqEntryQuery,
  ): Promise<{ data: FaqEntryEntity[]; total: number }> {
    const { page, limit, category, isPublished } = query;
    const where: Prisma.FaqEntryTableWhereInput = {};

    if (category) {
      where.category = category;
    }
    if (isPublished !== undefined) {
      where.is_published = isPublished;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.faqEntryTable.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ position: 'asc' }, { created_at: 'desc' }],
      }),
      this.prisma.faqEntryTable.count({ where }),
    ]);

    return { data: data.map(FaqEntryBdMapper.toDomain), total };
  }

  async delete(publicId: string): Promise<void> {
    await this.prisma.faqEntryTable.delete({ where: { public_id: publicId } });
  }

  async incrementViewCount(publicId: string): Promise<FaqEntryEntity> {
    const row = await this.prisma.faqEntryTable.update({
      where: { public_id: publicId },
      data: { view_count: { increment: 1 } },
    });

    return FaqEntryBdMapper.toDomain(row);
  }
}
