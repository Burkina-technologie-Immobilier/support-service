import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { SupportCategoryEnum } from 'src/domain/enums/support-category.enum';

export class UpdateFaqEntryDto {
  @IsOptional() @IsEnum(SupportCategoryEnum) category?: SupportCategoryEnum;
  @IsOptional() @IsString() @MaxLength(300) question?: string;
  @IsOptional() @IsString() answer?: string;
  @IsOptional() @IsInt() @Min(0) position?: number;
  @IsOptional() @IsBoolean() isPublished?: boolean;
}
