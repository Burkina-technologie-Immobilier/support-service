import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { SupportCategoryEnum } from 'src/domain/enums/support-category.enum';

export class CreateFaqEntryDto {
  @IsEnum(SupportCategoryEnum) category!: SupportCategoryEnum;
  @IsString() @MaxLength(300) question!: string;
  @IsString() answer!: string;
  @IsOptional() @IsInt() @Min(0) position?: number;
  @IsOptional() @IsBoolean() isPublished?: boolean;
}
