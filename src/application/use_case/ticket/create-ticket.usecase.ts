import { TicketEntity } from 'src/domain/entities/ticket.entity';
import { TicketPriorityEnum } from 'src/domain/enums/ticket-priority.enum';
import { TicketStatusEnum } from 'src/domain/enums/ticket-status.enum';
import {
  CreateTicketCommand,
  CreateTicketInterfacePort,
} from 'src/domain/port/in/ticket/create-ticket.interface.port';
import { PublicIdGeneratorPort } from 'src/domain/port/in/generate-public-id/generator-public-id.port';
import { TicketRepositoryPort } from 'src/domain/port/out/ticket.repository.port';
import { MeublezonePermission } from 'src/domain/enums/meublezone-permission.enum';
import { AccessGuard } from 'src/domain/service/policies/access.guard';
import { CreateTicketValidator } from 'src/domain/service/validators/ticket/create-ticket.validator';

export class CreateTicketUseCase implements CreateTicketInterfacePort {
  constructor(
    private readonly repository: TicketRepositoryPort,
    private readonly validator: CreateTicketValidator,
    private readonly publicIdGenerator: PublicIdGeneratorPort,
    private readonly access: AccessGuard,
  ) {}

  async execute(command: CreateTicketCommand): Promise<TicketEntity> {
    this.access.check({
      permission: MeublezonePermission.TICKET_WRITE,
      branchId: command.branchId,
    });
    this.validator.validate(command);

    const entity = new TicketEntity({
      publicId: this.publicIdGenerator.generateNanoid(),
      branchId: command.branchId,
      userId: command.userId,
      fullName: command.fullName.trim(),
      email: command.email,
      phone: command.phone,
      category: command.category,
      subject: command.subject.trim(),
      message: command.message.trim(),
      status: TicketStatusEnum.OPEN,
      priority: TicketPriorityEnum.NORMAL,
      orderId: command.orderId,
    });

    return this.repository.save(entity);
  }
}
