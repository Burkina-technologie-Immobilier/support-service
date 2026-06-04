import { IsInt, IsNotEmpty, IsString, IsUrl, Min } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';

export class ResponseReviewPhotoDto {
  @IsNanoId() @IsNotEmpty() publicId!: string;
  @IsString() @IsUrl({ require_protocol: true, protocols: ['https'] }) url!: string;
  @IsInt() @Min(0) position!: number;
}
