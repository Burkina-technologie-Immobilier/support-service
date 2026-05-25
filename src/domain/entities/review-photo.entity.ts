export interface ReviewPhotoProps {
  readonly id?: string;
  publicId: string;
  reviewId: string;
  url: string;
  position: number;
}

export class ReviewPhotoEntity {
  constructor(private readonly props: ReviewPhotoProps) {}

  get id(): string | undefined {
    return this.props.id;
  }
  get publicId(): string {
    return this.props.publicId;
  }
  get reviewId(): string {
    return this.props.reviewId;
  }
  get url(): string {
    return this.props.url;
  }
  get position(): number {
    return this.props.position;
  }
}
