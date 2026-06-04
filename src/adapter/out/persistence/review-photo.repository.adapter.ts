import { Injectable } from '@nestjs/common';
import { ReviewPhotoBdMapper } from 'src/application/mapper/review-photo/review-photo-bd.mapper';
import { ReviewPhotoEntity } from 'src/domain/entities/review-photo.entity';
import { ReviewPhotoRepositoryPort } from 'src/domain/port/out/review-photo.repository.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class ReviewPhotoRepositoryAdapter implements ReviewPhotoRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: ReviewPhotoEntity): Promise<ReviewPhotoEntity> {
    const data = ReviewPhotoBdMapper.toPersistence(entity);

    const saved = await this.prisma.reviewPhotoTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });

    return ReviewPhotoBdMapper.toDomain(saved);
  }

  async findByPublicId(publicId: string): Promise<ReviewPhotoEntity | null> {
    const row = await this.prisma.reviewPhotoTable.findUnique({
      where: { public_id: publicId },
    });
    return row ? ReviewPhotoBdMapper.toDomain(row) : null;
  }

  async findByReviewId(reviewId: string): Promise<ReviewPhotoEntity[]> {
    const rows = await this.prisma.reviewPhotoTable.findMany({
      where: { review_id: reviewId },
      orderBy: { position: 'asc' },
    });

    return rows.map(ReviewPhotoBdMapper.toDomain);
  }

  async delete(publicId: string): Promise<void> {
    await this.prisma.reviewPhotoTable.delete({ where: { public_id: publicId } });
  }
}
