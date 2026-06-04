import { ReviewStatusEnum } from '../enums/review-status.enum';

export interface ReviewProps {
  readonly id?: string;
  publicId: string;
  branchId: string;
  productId: string;
  userId: string;
  authorName?: string;
  rating: number;
  title?: string;
  body?: string;
  isVerified: boolean;
  orderId?: string;
  helpfulCount: number;
  status: ReviewStatusEnum;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class ReviewEntity {
  constructor(private readonly props: ReviewProps) {}

  get id(): string | undefined {
    return this.props.id;
  }
  get publicId(): string {
    return this.props.publicId;
  }
  get branchId(): string {
    return this.props.branchId;
  }
  get productId(): string {
    return this.props.productId;
  }
  get userId(): string {
    return this.props.userId;
  }
  get authorName(): string | undefined {
    return this.props.authorName;
  }
  get rating(): number {
    return this.props.rating;
  }
  get title(): string | undefined {
    return this.props.title;
  }
  get body(): string | undefined {
    return this.props.body;
  }
  get isVerified(): boolean {
    return this.props.isVerified;
  }
  get orderId(): string | undefined {
    return this.props.orderId;
  }
  get helpfulCount(): number {
    return this.props.helpfulCount;
  }
  get status(): ReviewStatusEnum {
    return this.props.status;
  }

  update(updates: Partial<ReviewProps>): ReviewEntity {
    Object.assign(this.props, updates);
    return this;
  }
}
