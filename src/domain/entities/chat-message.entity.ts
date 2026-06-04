import { SenderTypeEnum } from '../enums/sender-type.enum';

export interface ChatMessageProps {
  readonly id?: string;
  publicId: string;
  sessionId: string;
  senderType: SenderTypeEnum;
  body: string;
  readonly createdAt?: Date;
}

export class ChatMessageEntity {
  constructor(private readonly props: ChatMessageProps) {}

  get id(): string | undefined {
    return this.props.id;
  }
  get publicId(): string {
    return this.props.publicId;
  }
  get sessionId(): string {
    return this.props.sessionId;
  }
  get senderType(): SenderTypeEnum {
    return this.props.senderType;
  }
  get body(): string {
    return this.props.body;
  }
}
