import { BusinessError } from 'src/domain/errors/business.error';
import { CodesError } from 'src/domain/errors/codes.error';
import { UpdateTicketCommand } from 'src/domain/port/in/ticket/update-ticket.interface.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class UpdateTicketValidator {
  validate(command: UpdateTicketCommand): void {
    if (command.subject !== undefined && !command.subject?.trim()) {
      throw new BusinessError(CodesError.SUBJECT_REQUIRED);
    }
    if (command.message !== undefined && !command.message?.trim()) {
      throw new BusinessError(CodesError.MESSAGE_REQUIRED);
    }

    if (command.category !== undefined) {
      DomainValidation.assertCategory(command.category);
    }
    if (command.status !== undefined) {
      DomainValidation.assertTicketStatus(command.status);
    }
    if (command.priority !== undefined) {
      DomainValidation.assertTicketPriority(command.priority);
    }
  }
}
