import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { ReviewStatusEnum } from 'src/domain/enums/review-status.enum';

export class UpdateReviewDto {
  @IsOptional() @IsString() @MaxLength(120) authorName?: string;
  @IsOptional() @IsInt() @Min(1) @Max(5) rating?: number;
  @IsOptional() @IsString() @MaxLength(160) title?: string;
  @IsOptional() @IsString() body?: string;
  @IsOptional() @IsBoolean() isVerified?: boolean;
  @IsOptional() @IsEnum(ReviewStatusEnum) status?: ReviewStatusEnum;
}
