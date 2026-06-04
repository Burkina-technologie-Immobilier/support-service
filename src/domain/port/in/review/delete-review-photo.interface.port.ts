export interface DeleteReviewPhotoQuery {
  publicId: string;
}

export interface DeleteReviewPhotoInterfacePort {
  execute(query: DeleteReviewPhotoQuery): Promise<void>;
}
