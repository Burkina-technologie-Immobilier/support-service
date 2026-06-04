import { BusinessError } from 'src/domain/errors/business.error';
import { CodesError } from 'src/domain/errors/codes.error';
import { CreateTicketCommand } from 'src/domain/port/in/ticket/create-ticket.interface.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class CreateTicketValidator {
  validate(command: CreateTicketCommand): void {
    if (!command.fullName?.trim()) {
      throw new BusinessError(CodesError.FULL_NAME_REQUIRED);
    }
    if (!command.subject?.trim()) {
      throw new BusinessError(CodesError.SUBJECT_REQUIRED);
    }
    if (!command.message?.trim()) {
      throw new BusinessError(CodesError.MESSAGE_REQUIRED);
    }

    DomainValidation.assertEmail(command.email);
    DomainValidation.assertCategory(command.category);
    DomainValidation.assertUuid(command.branchId, CodesError.UUID_INVALID);
    DomainValidation.assertUuid(command.userId, CodesError.UUID_INVALID);
    DomainValidation.assertUuid(command.orderId, CodesError.UUID_INVALID);
  }
}
