import { CreateReviewDto } from 'src/application/dto/review/create-review.dto';
import { ListReviewDto } from 'src/application/dto/review/list-review.dto';
import { ResponseReviewDto } from 'src/application/dto/review/response-review.dto';
import { UpdateReviewDto } from 'src/application/dto/review/update-review.dto';
import { VoteReviewDto } from 'src/application/dto/review/vote-review.dto';
import { ReviewEntity } from 'src/domain/entities/review.entity';
import { CreateReviewCommand } from 'src/domain/port/in/review/create-review.interface.port';
import { ListReviewQuery } from 'src/domain/port/in/review/list-review.interface.port';
import { UpdateReviewCommand } from 'src/domain/port/in/review/update-review.interface.port';
import { VoteReviewCommand } from 'src/domain/port/in/review/vote-review.interface.port';

export class ReviewHttpMapper {
  static toCreateCommand(dto: CreateReviewDto): CreateReviewCommand {
    return {
      branchId: dto.branchId,
      productId: dto.productId,
      userId: dto.userId,
      authorName: dto.authorName,
      rating: dto.rating,
      title: dto.title,
      body: dto.body,
      isVerified: dto.isVerified,
      orderId: dto.orderId,
      status: dto.status,
    };
  }

  static toUpdateCommand(dto: UpdateReviewDto): UpdateReviewCommand {
    return {
      authorName: dto.authorName,
      rating: dto.rating,
      title: dto.title,
      body: dto.body,
      isVerified: dto.isVerified,
      status: dto.status,
    };
  }

  static toListQuery(dto: ListReviewDto): ListReviewQuery {
    return {
      page: dto.page,
      limit: dto.limit,
      productId: dto.productId,
      branchId: dto.branchId,
      status: dto.status,
      rating: dto.rating,
    };
  }

  static toVoteCommand(reviewPublicId: string, dto: VoteReviewDto): VoteReviewCommand {
    return {
      reviewPublicId,
      userId: dto.userId,
      isHelpful: dto.isHelpful,
    };
  }

  static toResponse(entity: ReviewEntity): ResponseReviewDto {
    return {
      publicId: entity.publicId,
      branchId: entity.branchId,
      productId: entity.productId,
      userId: entity.userId,
      authorName: entity.authorName,
      rating: entity.rating,
      title: entity.title,
      body: entity.body,
      isVerified: entity.isVerified,
      orderId: entity.orderId,
      helpfulCount: entity.helpfulCount,
      status: entity.status,
    };
  }
}
