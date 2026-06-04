import { IsBoolean, IsUUID } from 'class-validator';

export class VoteReviewDto {
  @IsUUID() userId!: string;
  @IsBoolean() isHelpful!: boolean;
}
