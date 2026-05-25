import { SupportCategoryEnum } from '../enums/support-category.enum';

export interface FaqEntryProps {
  readonly id?: string;
  publicId: string;
  category: SupportCategoryEnum;
  question: string;
  answer: string;
  position: number;
  isPublished: boolean;
  viewCount: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class FaqEntryEntity {
  constructor(private readonly props: FaqEntryProps) {}

  get id(): string | undefined {
    return this.props.id;
  }
  get publicId(): string {
    return this.props.publicId;
  }
  get category(): SupportCategoryEnum {
    return this.props.category;
  }
  get question(): string {
    return this.props.question;
  }
  get answer(): string {
    return this.props.answer;
  }
  get position(): number {
    return this.props.position;
  }
  get isPublished(): boolean {
    return this.props.isPublished;
  }
  get viewCount(): number {
    return this.props.viewCount;
  }

  update(updates: Partial<FaqEntryProps>): FaqEntryEntity {
    Object.assign(this.props, updates);
    return this;
  }
}
