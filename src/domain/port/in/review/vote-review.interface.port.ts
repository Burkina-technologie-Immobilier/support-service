export interface VoteReviewCommand {
  reviewPublicId: string;
  userId: string;
  isHelpful: boolean;
}

export interface VoteReviewResult {
  created: boolean;
  previousHelpful?: boolean;
}

export interface VoteReviewInterfacePort {
  execute(command: VoteReviewCommand): Promise<VoteReviewResult>;
}
