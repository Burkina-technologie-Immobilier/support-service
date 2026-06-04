import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import { TicketMessageEntity } from 'src/domain/entities/ticket-message.entity';
import { BusinessError } from 'src/domain/errors/business.error';
import { CodesError as DomainCodesError } from 'src/domain/errors/codes.error';
import {
  CreateTicketMessageCommand,
  CreateTicketMessageInterfacePort,
} from 'src/domain/port/in/ticket/create-ticket-message.interface.port';
import { PublicIdGeneratorPort } from 'src/domain/port/in/generate-public-id/generator-public-id.port';
import { TicketMessageRepositoryPort } from 'src/domain/port/out/ticket-message.repository.port';
import { TicketRepositoryPort } from 'src/domain/port/out/ticket.repository.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class CreateTicketMessageUseCase implements CreateTicketMessageInterfacePort {
  constructor(
    private readonly ticketRepository: TicketRepositoryPort,
    private readonly messageRepository: TicketMessageRepositoryPort,
    private readonly publicIdGenerator: PublicIdGeneratorPort,
  ) {}

  async execute(command: CreateTicketMessageCommand): Promise<TicketMessageEntity> {
    DomainValidation.assertPublicId(command.ticketPublicId);
    DomainValidation.assertSenderType(command.senderType);
    DomainValidation.assertUuid(command.senderId, DomainCodesError.UUID_INVALID);

    if (!command.body?.trim()) {
      throw new BusinessError(DomainCodesError.BODY_REQUIRED);
    }

    const ticket = await this.ticketRepository.findByPublicId(command.ticketPublicId);
    if (!ticket?.id) {
      throw new ApplicationError(CodesError.TICKET_NOT_FOUND);
    }

    const entity = new TicketMessageEntity({
      publicId: this.publicIdGenerator.generateNanoid(),
      ticketId: ticket.id,
      senderType: command.senderType,
      senderId: command.senderId,
      body: command.body.trim(),
    });

    return this.messageRepository.save(entity);
  }
}
