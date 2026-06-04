import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import { TicketEntity } from 'src/domain/entities/ticket.entity';
import {
  GetTicketInterfacePort,
  GetTicketQuery,
} from 'src/domain/port/in/ticket/get-ticket.interface.port';
import { TicketRepositoryPort } from 'src/domain/port/out/ticket.repository.port';
import { GetTicketValidator } from 'src/domain/service/validators/ticket/get-ticket.validator';

export class GetTicketUseCase implements GetTicketInterfacePort {
  constructor(
    private readonly repository: TicketRepositoryPort,
    private readonly validator: GetTicketValidator,
  ) {}

  async execute(query: GetTicketQuery): Promise<TicketEntity> {
    this.validator.validate(query);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.TICKET_NOT_FOUND);
    }

    return entity;
  }
}
