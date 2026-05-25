import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import {
  DeleteTicketQuery,
  DeleteTicketInterfacePort,
} from 'src/domain/port/in/ticket/delete-ticket.interface.port';
import { TicketRepositoryPort } from 'src/domain/port/out/ticket.repository.port';
import { DeleteTicketValidator } from 'src/domain/service/validators/ticket/delete-ticket.validator';

export class DeleteTicketUseCase implements DeleteTicketInterfacePort {
  constructor(
    private readonly repository: TicketRepositoryPort,
    private readonly validator: DeleteTicketValidator,
  ) {}

  async execute(query: DeleteTicketQuery): Promise<void> {
    this.validator.validate(query);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.TICKET_NOT_FOUND);
    }

    await this.repository.delete(query.publicId);
  }
}
