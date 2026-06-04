import { BusinessError } from 'src/domain/errors/business.error';
import { CodesError } from 'src/domain/errors/codes.error';
import { UpdateFaqEntryCommand } from 'src/domain/port/in/faq-entry/update-faq-entry.interface.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class UpdateFaqEntryValidator {
  validate(command: UpdateFaqEntryCommand): void {
    if (command.question !== undefined && !command.question?.trim()) {
      throw new BusinessError(CodesError.QUESTION_REQUIRED);
    }
    if (command.answer !== undefined && !command.answer?.trim()) {
      throw new BusinessError(CodesError.ANSWER_REQUIRED);
    }

    if (command.category !== undefined) {
      DomainValidation.assertCategory(command.category);
    }
  }
}
