import { ReviewTable } from '@prisma/client';
import { ReviewEntity } from 'src/domain/entities/review.entity';
import { ReviewStatusEnum } from 'src/domain/enums/review-status.enum';

export class ReviewBdMapper {
  static toDomain(row: ReviewTable): ReviewEntity {
    return new ReviewEntity({
      id: row.id,
      publicId: row.public_id,
      branchId: row.branch_id,
      productId: row.product_id,
      userId: row.user_id,
      authorName: row.author_name ?? undefined,
      rating: row.rating,
      title: row.title ?? undefined,
      body: row.body ?? undefined,
      isVerified: row.is_verified,
      orderId: row.order_id ?? undefined,
      helpfulCount: row.helpful_count,
      status: row.status as ReviewStatusEnum,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  static toPersistence(entity: ReviewEntity) {
    return {
      public_id: entity.publicId,
      branch_id: entity.branchId,
      product_id: entity.productId,
      user_id: entity.userId,
      author_name: entity.authorName ?? null,
      rating: entity.rating,
      title: entity.title ?? null,
      body: entity.body ?? null,
      is_verified: entity.isVerified,
      order_id: entity.orderId ?? null,
      helpful_count: entity.helpfulCount,
      status: entity.status,
    };
  }
}
