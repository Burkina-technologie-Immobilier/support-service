import { ChatMessageEntity } from 'src/domain/entities/chat-message.entity';
import { SenderTypeEnum } from 'src/domain/enums/sender-type.enum';

export interface CreateChatMessageCommand {
  sessionPublicId: string;
  senderType: SenderTypeEnum;
  body: string;
}

export interface CreateChatMessageInterfacePort {
  execute(command: CreateChatMessageCommand): Promise<ChatMessageEntity>;
}
