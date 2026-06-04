import { CreateTicketMessageDto } from 'src/application/dto/ticket/create-ticket-message.dto';
import { ResponseTicketMessageDto } from 'src/application/dto/ticket/response-ticket-message.dto';
import { TicketMessageEntity } from 'src/domain/entities/ticket-message.entity';
import { CreateTicketMessageCommand } from 'src/domain/port/in/ticket/create-ticket-message.interface.port';

export class TicketMessageHttpMapper {
  static toCreateCommand(
    ticketPublicId: string,
    dto: CreateTicketMessageDto,
  ): CreateTicketMessageCommand {
    return {
      ticketPublicId,
      senderType: dto.senderType,
      senderId: dto.senderId,
      body: dto.body,
    };
  }

  static toResponse(entity: TicketMessageEntity): ResponseTicketMessageDto {
    return {
      publicId: entity.publicId,
      senderType: entity.senderType,
      senderId: entity.senderId,
      body: entity.body,
    };
  }
}
