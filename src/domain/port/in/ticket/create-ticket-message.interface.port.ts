import { TicketMessageEntity } from 'src/domain/entities/ticket-message.entity';
import { SenderTypeEnum } from 'src/domain/enums/sender-type.enum';

export interface CreateTicketMessageCommand {
  ticketPublicId: string;
  senderType: SenderTypeEnum;
  senderId?: string;
  body: string;
}

export interface CreateTicketMessageInterfacePort {
  execute(command: CreateTicketMessageCommand): Promise<TicketMessageEntity>;
}
