import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { ReviewStatusEnum } from 'src/domain/enums/review-status.enum';

export class ListReviewDto {
  @Type(() => Number) @IsInt() @Min(1) page: number = 1;
  @Type(() => Number) @IsInt() @Min(1) @Max(100) limit: number = 10;
  @IsOptional() @IsUUID() productId?: string;
  @IsOptional() @IsUUID() branchId?: string;
  @IsOptional() @IsEnum(ReviewStatusEnum) status?: ReviewStatusEnum;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(5) rating?: number;
}
