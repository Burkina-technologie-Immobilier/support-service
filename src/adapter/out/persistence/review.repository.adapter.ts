import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ReviewBdMapper } from 'src/application/mapper/review/review-bd.mapper';
import { ReviewEntity } from 'src/domain/entities/review.entity';
import { ListReviewQuery } from 'src/domain/port/in/review/list-review.interface.port';
import { ReviewRepositoryPort } from 'src/domain/port/out/review.repository.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class ReviewRepositoryAdapter implements ReviewRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: ReviewEntity): Promise<ReviewEntity> {
    const data = ReviewBdMapper.toPersistence(entity);

    const saved = await this.prisma.reviewTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });

    return ReviewBdMapper.toDomain(saved);
  }

  async findByPublicId(publicId: string): Promise<ReviewEntity | null> {
    const row = await this.prisma.reviewTable.findUnique({
      where: { public_id: publicId },
    });
    return row ? ReviewBdMapper.toDomain(row) : null;
  }

  async findByProductAndUser(
    productId: string,
    userId: string,
  ): Promise<ReviewEntity | null> {
    const row = await this.prisma.reviewTable.findUnique({
      where: {
        product_id_user_id: {
          product_id: productId,
          user_id: userId,
        },
      },
    });
    return row ? ReviewBdMapper.toDomain(row) : null;
  }

  async findWithPagination(
    query: ListReviewQuery,
  ): Promise<{ data: ReviewEntity[]; total: number }> {
    const { page, limit, productId, branchId, status, rating } = query;
    const where: Prisma.ReviewTableWhereInput = {};

    if (productId) {
      where.product_id = productId;
    }
    if (branchId) {
      where.branch_id = branchId;
    }
    if (status) {
      where.status = status;
    }
    if (rating !== undefined) {
      where.rating = rating;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.reviewTable.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.reviewTable.count({ where }),
    ]);

    return { data: data.map(ReviewBdMapper.toDomain), total };
  }

  async delete(publicId: string): Promise<void> {
    await this.prisma.reviewTable.delete({ where: { public_id: publicId } });
  }

  async incrementHelpfulCount(reviewId: string, delta: number): Promise<void> {
    await this.prisma.reviewTable.update({
      where: { id: reviewId },
      data: { helpful_count: { increment: delta } },
    });
  }
}
