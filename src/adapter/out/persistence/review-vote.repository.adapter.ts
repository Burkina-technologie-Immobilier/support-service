import { Injectable } from '@nestjs/common';
import { ReviewVoteRepositoryPort } from 'src/domain/port/out/review-vote.repository.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class ReviewVoteRepositoryAdapter implements ReviewVoteRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async upsert(
    reviewId: string,
    userId: string,
    isHelpful: boolean,
  ): Promise<{ created: boolean; previousHelpful?: boolean }> {
    const existing = await this.prisma.reviewVoteTable.findUnique({
      where: {
        review_id_user_id: {
          review_id: reviewId,
          user_id: userId,
        },
      },
    });

    if (!existing) {
      await this.prisma.reviewVoteTable.create({
        data: {
          review_id: reviewId,
          user_id: userId,
          is_helpful: isHelpful,
        },
      });
      return { created: true };
    }

    const previousHelpful = existing.is_helpful;

    if (previousHelpful === isHelpful) {
      return { created: false, previousHelpful };
    }

    await this.prisma.reviewVoteTable.update({
      where: {
        review_id_user_id: {
          review_id: reviewId,
          user_id: userId,
        },
      },
      data: { is_helpful: isHelpful },
    });

    return { created: false, previousHelpful };
  }
}
