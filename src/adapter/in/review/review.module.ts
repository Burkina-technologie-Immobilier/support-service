import { Module } from '@nestjs/common';
import { PublicIdGeneratorAdapter } from '../generate-public-id/generate.public-id.adapter';
import { ReviewPhotoRepositoryAdapter } from 'src/adapter/out/persistence/review-photo.repository.adapter';
import { ReviewRepositoryAdapter } from 'src/adapter/out/persistence/review.repository.adapter';
import { ReviewVoteRepositoryAdapter } from 'src/adapter/out/persistence/review-vote.repository.adapter';
import { CreateReviewPhotoUseCase } from 'src/application/use_case/review/create-review-photo.usecase';
import { CreateReviewUseCase } from 'src/application/use_case/review/create-review.usecase';
import { DeleteReviewPhotoUseCase } from 'src/application/use_case/review/delete-review-photo.usecase';
import { DeleteReviewUseCase } from 'src/application/use_case/review/delete-review.usecase';
import { GetReviewUseCase } from 'src/application/use_case/review/get-review.usecase';
import { ListReviewPhotoUseCase } from 'src/application/use_case/review/list-review-photo.usecase';
import { ListReviewUseCase } from 'src/application/use_case/review/list-review.usecase';
import { UpdateReviewUseCase } from 'src/application/use_case/review/update-review.usecase';
import { VoteReviewUseCase } from 'src/application/use_case/review/vote-review.usecase';
import {
  PUBLIC_ID_GENERATOR_PORT,
  REVIEW_PHOTO_REPOSITORY_PORT,
  REVIEW_REPOSITORY_PORT,
  REVIEW_VOTE_REPOSITORY_PORT,
} from 'src/domain/port/tokens/tokens';
import { CreateReviewValidator } from 'src/domain/service/validators/review/create-review.validator';
import { DeleteReviewValidator } from 'src/domain/service/validators/review/delete-review.validator';
import { GetReviewValidator } from 'src/domain/service/validators/review/get-review.validator';
import { UpdateReviewValidator } from 'src/domain/service/validators/review/update-review.validator';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { ReviewControllerAdapter } from './review.controller.adapter';

@Module({
  imports: [PrismaModule],
  controllers: [ReviewControllerAdapter],
  providers: [
    { provide: REVIEW_REPOSITORY_PORT, useClass: ReviewRepositoryAdapter },
    { provide: REVIEW_PHOTO_REPOSITORY_PORT, useClass: ReviewPhotoRepositoryAdapter },
    { provide: REVIEW_VOTE_REPOSITORY_PORT, useClass: ReviewVoteRepositoryAdapter },
    { provide: PUBLIC_ID_GENERATOR_PORT, useClass: PublicIdGeneratorAdapter },
    CreateReviewValidator,
    UpdateReviewValidator,
    GetReviewValidator,
    DeleteReviewValidator,
    {
      provide: CreateReviewUseCase,
      useFactory: (repo, validator, idGen) => new CreateReviewUseCase(repo, validator, idGen),
      inject: [REVIEW_REPOSITORY_PORT, CreateReviewValidator, PUBLIC_ID_GENERATOR_PORT],
    },
    {
      provide: GetReviewUseCase,
      useFactory: (repo, validator) => new GetReviewUseCase(repo, validator),
      inject: [REVIEW_REPOSITORY_PORT, GetReviewValidator],
    },
    {
      provide: ListReviewUseCase,
      useFactory: (repo) => new ListReviewUseCase(repo),
      inject: [REVIEW_REPOSITORY_PORT],
    },
    {
      provide: UpdateReviewUseCase,
      useFactory: (repo, validator) => new UpdateReviewUseCase(repo, validator),
      inject: [REVIEW_REPOSITORY_PORT, UpdateReviewValidator],
    },
    {
      provide: DeleteReviewUseCase,
      useFactory: (repo, validator) => new DeleteReviewUseCase(repo, validator),
      inject: [REVIEW_REPOSITORY_PORT, DeleteReviewValidator],
    },
    {
      provide: CreateReviewPhotoUseCase,
      useFactory: (reviewRepo, photoRepo, idGen) =>
        new CreateReviewPhotoUseCase(reviewRepo, photoRepo, idGen),
      inject: [REVIEW_REPOSITORY_PORT, REVIEW_PHOTO_REPOSITORY_PORT, PUBLIC_ID_GENERATOR_PORT],
    },
    {
      provide: ListReviewPhotoUseCase,
      useFactory: (reviewRepo, photoRepo) => new ListReviewPhotoUseCase(reviewRepo, photoRepo),
      inject: [REVIEW_REPOSITORY_PORT, REVIEW_PHOTO_REPOSITORY_PORT],
    },
    {
      provide: DeleteReviewPhotoUseCase,
      useFactory: (photoRepo) => new DeleteReviewPhotoUseCase(photoRepo),
      inject: [REVIEW_PHOTO_REPOSITORY_PORT],
    },
    {
      provide: VoteReviewUseCase,
      useFactory: (reviewRepo, voteRepo) => new VoteReviewUseCase(reviewRepo, voteRepo),
      inject: [REVIEW_REPOSITORY_PORT, REVIEW_VOTE_REPOSITORY_PORT],
    },
  ],
})
export class ReviewModule {}
