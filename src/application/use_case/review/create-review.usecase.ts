import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import { ReviewEntity } from 'src/domain/entities/review.entity';
import { ReviewStatusEnum } from 'src/domain/enums/review-status.enum';
import {
  CreateReviewCommand,
  CreateReviewInterfacePort,
} from 'src/domain/port/in/review/create-review.interface.port';
import { PublicIdGeneratorPort } from 'src/domain/port/in/generate-public-id/generator-public-id.port';
import { ReviewRepositoryPort } from 'src/domain/port/out/review.repository.port';
import { CreateReviewValidator } from 'src/domain/service/validators/review/create-review.validator';

export class CreateReviewUseCase implements CreateReviewInterfacePort {
  constructor(
    private readonly repository: ReviewRepositoryPort,
    private readonly validator: CreateReviewValidator,
    private readonly publicIdGenerator: PublicIdGeneratorPort,
  ) {}

  async execute(command: CreateReviewCommand): Promise<ReviewEntity> {
    this.validator.validate(command);

    const existing = await this.repository.findByProductAndUser(
      command.productId,
      command.userId,
    );
    if (existing) {
      throw new ApplicationError(CodesError.DUPLICATE_REVIEW);
    }

    const entity = new ReviewEntity({
      publicId: this.publicIdGenerator.generateNanoid(),
      branchId: command.branchId,
      productId: command.productId,
      userId: command.userId,
      authorName: command.authorName?.trim(),
      rating: command.rating,
      title: command.title?.trim(),
      body: command.body?.trim(),
      isVerified: command.isVerified ?? false,
      orderId: command.orderId,
      helpfulCount: 0,
      status: command.status ?? ReviewStatusEnum.PUBLISHED,
    });

    return this.repository.save(entity);
  }
}
