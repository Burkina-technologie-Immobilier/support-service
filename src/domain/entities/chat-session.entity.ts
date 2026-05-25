import { ChatSessionStatusEnum } from '../enums/chat-session-status.enum';

export interface ChatSessionProps {
  readonly id?: string;
  publicId: string;
  userId?: string;
  agentId?: string;
  status: ChatSessionStatusEnum;
  readonly startedAt?: Date;
  closedAt?: Date;
}

export class ChatSessionEntity {
  constructor(private readonly props: ChatSessionProps) {}

  get id(): string | undefined {
    return this.props.id;
  }
  get publicId(): string {
    return this.props.publicId;
  }
  get userId(): string | undefined {
    return this.props.userId;
  }
  get agentId(): string | undefined {
    return this.props.agentId;
  }
  get status(): ChatSessionStatusEnum {
    return this.props.status;
  }
  get closedAt(): Date | undefined {
    return this.props.closedAt;
  }

  update(updates: Partial<ChatSessionProps>): ChatSessionEntity {
    Object.assign(this.props, updates);
    return this;
  }
}
