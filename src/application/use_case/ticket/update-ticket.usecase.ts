import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import { TicketEntity } from 'src/domain/entities/ticket.entity';
import { GetTicketQuery } from 'src/domain/port/in/ticket/get-ticket.interface.port';
import {
  UpdateTicketCommand,
  UpdateTicketInterfacePort,
} from 'src/domain/port/in/ticket/update-ticket.interface.port';
import { TicketRepositoryPort } from 'src/domain/port/out/ticket.repository.port';
import { MeublezonePermission } from 'src/domain/enums/meublezone-permission.enum';
import { AccessGuard } from 'src/domain/service/policies/access.guard';
import { TicketStatusPolicy } from 'src/domain/service/policies/ticket-status.policy';
import { UpdateTicketValidator } from 'src/domain/service/validators/ticket/update-ticket.validator';

export class UpdateTicketUseCase implements UpdateTicketInterfacePort {
  constructor(
    private readonly repository: TicketRepositoryPort,
    private readonly validator: UpdateTicketValidator,
    private readonly access: AccessGuard,
    private readonly ticketStatusPolicy: TicketStatusPolicy,
  ) {}

  async execute(query: GetTicketQuery, command: UpdateTicketCommand): Promise<TicketEntity> {
    this.validator.validate(command);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.TICKET_NOT_FOUND);
    }
    this.access.check({
      permission: MeublezonePermission.TICKET_WRITE,
      branchId: entity.branchId,
    });
    if (command.status) {
      this.ticketStatusPolicy.assertTransition(entity.status, command.status);
    }

    entity.update({
      branchId: command.branchId !== undefined ? command.branchId ?? undefined : entity.branchId,
      userId: command.userId !== undefined ? command.userId ?? undefined : entity.userId,
      fullName: command.fullName ?? entity.fullName,
      email: command.email ?? entity.email,
      phone: command.phone !== undefined ? command.phone ?? undefined : entity.phone,
      category: command.category ?? entity.category,
      subject: command.subject ?? entity.subject,
      message: command.message ?? entity.message,
      status: command.status ?? entity.status,
      priority: command.priority ?? entity.priority,
      orderId: command.orderId !== undefined ? command.orderId ?? undefined : entity.orderId,
    });

    return this.repository.save(entity);
  }
}
