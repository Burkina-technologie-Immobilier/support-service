import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';
import { SupportCategoryEnum } from 'src/domain/enums/support-category.enum';

export class ResponseFaqEntryDto {
  @IsNanoId() @IsNotEmpty() publicId!: string;
  @IsEnum(SupportCategoryEnum) category!: SupportCategoryEnum;
  @IsNotEmpty() @IsString() @MaxLength(300) question!: string;
  @IsNotEmpty() @IsString() answer!: string;
  @IsInt() @Min(0) position!: number;
  @IsBoolean() isPublished!: boolean;
  @IsInt() @Min(0) viewCount!: number;
}
