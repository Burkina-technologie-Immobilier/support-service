import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from 'class-validator';
import { ReviewStatusEnum } from 'src/domain/enums/review-status.enum';

export class CreateReviewDto {
  @IsUUID() branchId!: string;
  @IsUUID() productId!: string;
  @IsUUID() userId!: string;
  @IsOptional() @IsString() @MaxLength(120) authorName?: string;
  @IsInt() @Min(1) @Max(5) rating!: number;
  @IsOptional() @IsString() @MaxLength(160) title?: string;
  @IsOptional() @IsString() body?: string;
  @IsOptional() @IsBoolean() isVerified?: boolean;
  @IsOptional() @IsUUID() orderId?: string;
  @IsOptional() @IsEnum(ReviewStatusEnum) status?: ReviewStatusEnum;
}
