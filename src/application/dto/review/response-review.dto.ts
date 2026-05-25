import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';
import { ReviewStatusEnum } from 'src/domain/enums/review-status.enum';

export class ResponseReviewDto {
  @IsNanoId() @IsNotEmpty() publicId!: string;
  @IsUUID() branchId!: string;
  @IsUUID() productId!: string;
  @IsUUID() userId!: string;
  @IsOptional() @IsString() @MaxLength(120) authorName?: string;
  @IsInt() @Min(1) @Max(5) rating!: number;
  @IsOptional() @IsString() @MaxLength(160) title?: string;
  @IsOptional() @IsString() body?: string;
  @IsBoolean() isVerified!: boolean;
  @IsOptional() @IsUUID() orderId?: string;
  @IsInt() @Min(0) helpfulCount!: number;
  @IsEnum(ReviewStatusEnum) status!: ReviewStatusEnum;
}
