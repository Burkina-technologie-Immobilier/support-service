export interface ReviewVoteRepositoryPort {
  upsert(reviewId: string, userId: string, isHelpful: boolean): Promise<{ created: boolean; previousHelpful?: boolean }>;
}
