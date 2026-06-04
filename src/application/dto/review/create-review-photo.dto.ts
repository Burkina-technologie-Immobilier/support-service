import { IsInt, IsOptional, IsString, IsUrl, Min } from 'class-validator';

export class CreateReviewPhotoDto {
  @IsString() @IsUrl({ require_protocol: true, protocols: ['https'] }) url!: string;
  @IsOptional() @IsInt() @Min(0) position?: number;
}
