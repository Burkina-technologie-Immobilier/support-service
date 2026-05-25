import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { SupportCategoryEnum } from 'src/domain/enums/support-category.enum';

export class ListFaqEntryDto {
  @Type(() => Number) @IsInt() @Min(1) page: number = 1;
  @Type(() => Number) @IsInt() @Min(1) @Max(100) limit: number = 10;
  @IsOptional() @IsEnum(SupportCategoryEnum) category?: SupportCategoryEnum;
  @IsOptional() @IsBoolean() isPublished?: boolean;
}
