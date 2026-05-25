import { CreateReviewPhotoDto } from 'src/application/dto/review/create-review-photo.dto';
import { ResponseReviewPhotoDto } from 'src/application/dto/review/response-review-photo.dto';
import { ReviewPhotoEntity } from 'src/domain/entities/review-photo.entity';
import { CreateReviewPhotoCommand } from 'src/domain/port/in/review/create-review-photo.interface.port';

export class ReviewPhotoHttpMapper {
  static toCreateCommand(
    reviewPublicId: string,
    dto: CreateReviewPhotoDto,
  ): CreateReviewPhotoCommand {
    return {
      reviewPublicId,
      url: dto.url,
      position: dto.position,
    };
  }

  static toResponse(entity: ReviewPhotoEntity): ResponseReviewPhotoDto {
    return {
      publicId: entity.publicId,
      url: entity.url,
      position: entity.position,
    };
  }
}
