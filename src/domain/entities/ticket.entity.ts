import { SupportCategoryEnum } from '../enums/support-category.enum';
import { TicketPriorityEnum } from '../enums/ticket-priority.enum';
import { TicketStatusEnum } from '../enums/ticket-status.enum';

export interface TicketProps {
  readonly id?: string;
  publicId: string;
  branchId?: string;
  userId?: string;
  fullName: string;
  email: string;
  phone?: string;
  category: SupportCategoryEnum;
  subject: string;
  message: string;
  status: TicketStatusEnum;
  priority: TicketPriorityEnum;
  orderId?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class TicketEntity {
  constructor(private readonly props: TicketProps) {}

  get id(): string | undefined {
    return this.props.id;
  }
  get publicId(): string {
    return this.props.publicId;
  }
  get branchId(): string | undefined {
    return this.props.branchId;
  }
  get userId(): string | undefined {
    return this.props.userId;
  }
  get fullName(): string {
    return this.props.fullName;
  }
  get email(): string {
    return this.props.email;
  }
  get phone(): string | undefined {
    return this.props.phone;
  }
  get category(): SupportCategoryEnum {
    return this.props.category;
  }
  get subject(): string {
    return this.props.subject;
  }
  get message(): string {
    return this.props.message;
  }
  get status(): TicketStatusEnum {
    return this.props.status;
  }
  get priority(): TicketPriorityEnum {
    return this.props.priority;
  }
  get orderId(): string | undefined {
    return this.props.orderId;
  }

  update(updates: Partial<TicketProps>): TicketEntity {
    Object.assign(this.props, updates);
    return this;
  }
}
