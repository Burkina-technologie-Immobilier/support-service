import { BusinessError } from 'src/domain/errors/business.error';
import { CodesError } from 'src/domain/errors/codes.error';
import { CreateFaqEntryCommand } from 'src/domain/port/in/faq-entry/create-faq-entry.interface.port';
import { DomainValidation } from 'src/lib/domain-validation';

export class CreateFaqEntryValidator {
  validate(command: CreateFaqEntryCommand): void {
    if (!command.question?.trim()) {
      throw new BusinessError(CodesError.QUESTION_REQUIRED);
    }
    if (!command.answer?.trim()) {
      throw new BusinessError(CodesError.ANSWER_REQUIRED);
    }

    DomainValidation.assertCategory(command.category);
  }
}
