import { SenderTypeEnum } from '../enums/sender-type.enum';

export interface TicketMessageProps {
  readonly id?: string;
  publicId: string;
  ticketId: string;
  senderType: SenderTypeEnum;
  senderId?: string;
  body: string;
  readonly createdAt?: Date;
}

export class TicketMessageEntity {
  constructor(private readonly props: TicketMessageProps) {}

  get id(): string | undefined {
    return this.props.id;
  }
  get publicId(): string {
    return this.props.publicId;
  }
  get ticketId(): string {
    return this.props.ticketId;
  }
  get senderType(): SenderTypeEnum {
    return this.props.senderType;
  }
  get senderId(): string | undefined {
    return this.props.senderId;
  }
  get body(): string {
    return this.props.body;
  }
}
