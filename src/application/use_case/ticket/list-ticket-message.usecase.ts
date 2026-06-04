import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import { TicketMessageEntity } from 'src/domain/entities/ticket-message.entity';
import {
  ListTicketMessageInterfacePort,
  ListTicketMessageQuery,
} from 'src/domain/port/in/ticket/list-ticket-message.interface.port';
import { TicketMessageRepositoryPort } from 'src/domain/port/out/ticket-message.repository.port';
import { TicketRepositoryPort } from 'src/domain/port/out/ticket.repository.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class ListTicketMessageUseCase implements ListTicketMessageInterfacePort {
  constructor(
    private readonly ticketRepository: TicketRepositoryPort,
    private readonly messageRepository: TicketMessageRepositoryPort,
  ) {}

  async execute(query: ListTicketMessageQuery): Promise<TicketMessageEntity[]> {
    DomainValidation.assertPublicId(query.ticketPublicId);

    const ticket = await this.ticketRepository.findByPublicId(query.ticketPublicId);
    if (!ticket?.id) {
      throw new ApplicationError(CodesError.TICKET_NOT_FOUND);
    }

    return this.messageRepository.findByTicketId(ticket.id);
  }
}
