import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateReviewPhotoDto } from 'src/application/dto/review/create-review-photo.dto';
import { CreateReviewDto } from 'src/application/dto/review/create-review.dto';
import { ListReviewDto } from 'src/application/dto/review/list-review.dto';
import { UpdateReviewDto } from 'src/application/dto/review/update-review.dto';
import { VoteReviewDto } from 'src/application/dto/review/vote-review.dto';
import { PaginatedResponseMapper } from 'src/application/mapper/paginate/paginated-response.mapper.dto';
import { ReviewPhotoHttpMapper } from 'src/application/mapper/review/review-photo-http.mapper';
import { ReviewHttpMapper } from 'src/application/mapper/review/review-http.mapper';
import { CreateReviewPhotoUseCase } from 'src/application/use_case/review/create-review-photo.usecase';
import { CreateReviewUseCase } from 'src/application/use_case/review/create-review.usecase';
import { DeleteReviewPhotoUseCase } from 'src/application/use_case/review/delete-review-photo.usecase';
import { DeleteReviewUseCase } from 'src/application/use_case/review/delete-review.usecase';
import { GetReviewUseCase } from 'src/application/use_case/review/get-review.usecase';
import { ListReviewPhotoUseCase } from 'src/application/use_case/review/list-review-photo.usecase';
import { ListReviewUseCase } from 'src/application/use_case/review/list-review.usecase';
import { UpdateReviewUseCase } from 'src/application/use_case/review/update-review.usecase';
import { VoteReviewUseCase } from 'src/application/use_case/review/vote-review.usecase';

@Controller('reviews')
export class ReviewControllerAdapter {
  constructor(
    private readonly createReview: CreateReviewUseCase,
    private readonly getReview: GetReviewUseCase,
    private readonly listReview: ListReviewUseCase,
    private readonly updateReview: UpdateReviewUseCase,
    private readonly deleteReview: DeleteReviewUseCase,
    private readonly createReviewPhoto: CreateReviewPhotoUseCase,
    private readonly listReviewPhoto: ListReviewPhotoUseCase,
    private readonly deleteReviewPhoto: DeleteReviewPhotoUseCase,
    private readonly voteReview: VoteReviewUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateReviewDto) {
    const result = await this.createReview.execute(ReviewHttpMapper.toCreateCommand(dto));
    return ReviewHttpMapper.toResponse(result);
  }

  @Get()
  async list(@Query() dto: ListReviewDto) {
    const result = await this.listReview.execute(ReviewHttpMapper.toListQuery(dto));
    return PaginatedResponseMapper.toPaginatedDto(result, ReviewHttpMapper.toResponse);
  }

  @Get(':publicId')
  async get(@Param('publicId') publicId: string) {
    const result = await this.getReview.execute({ publicId });
    return ReviewHttpMapper.toResponse(result);
  }

  @Patch(':publicId')
  async update(@Param('publicId') publicId: string, @Body() dto: UpdateReviewDto) {
    const result = await this.updateReview.execute(
      { publicId },
      ReviewHttpMapper.toUpdateCommand(dto),
    );
    return ReviewHttpMapper.toResponse(result);
  }

  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    await this.deleteReview.execute({ publicId });
    return { message: 'Review deleted successfully' };
  }

  @Post(':publicId/photos')
  async createPhoto(
    @Param('publicId') publicId: string,
    @Body() dto: CreateReviewPhotoDto,
  ) {
    const result = await this.createReviewPhoto.execute(
      ReviewPhotoHttpMapper.toCreateCommand(publicId, dto),
    );
    return ReviewPhotoHttpMapper.toResponse(result);
  }

  @Get(':publicId/photos')
  async listPhotos(@Param('publicId') publicId: string) {
    const result = await this.listReviewPhoto.execute({ reviewPublicId: publicId });
    return result.map(ReviewPhotoHttpMapper.toResponse);
  }

  @Delete('photos/:photoPublicId')
  async deletePhoto(@Param('photoPublicId') photoPublicId: string) {
    await this.deleteReviewPhoto.execute({ publicId: photoPublicId });
    return { message: 'Review photo deleted successfully' };
  }

  @Post(':publicId/vote')
  async vote(@Param('publicId') publicId: string, @Body() dto: VoteReviewDto) {
    return this.voteReview.execute(ReviewHttpMapper.toVoteCommand(publicId, dto));
  }
}
