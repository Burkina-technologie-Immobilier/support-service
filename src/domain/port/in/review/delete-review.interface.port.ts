export interface DeleteReviewQuery {
  publicId: string;
}

export interface DeleteReviewInterfacePort {
  execute(query: DeleteReviewQuery): Promise<void>;
}
