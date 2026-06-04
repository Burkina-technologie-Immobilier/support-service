import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import { FaqEntryEntity } from 'src/domain/entities/faq-entry.entity';
import { GetFaqEntryQuery } from 'src/domain/port/in/faq-entry/get-faq-entry.interface.port';
import {
  UpdateFaqEntryCommand,
  UpdateFaqEntryInterfacePort,
} from 'src/domain/port/in/faq-entry/update-faq-entry.interface.port';
import { FaqEntryRepositoryPort } from 'src/domain/port/out/faq-entry.repository.port';
import { UpdateFaqEntryValidator } from 'src/domain/service/validators/faq-entry/update-faq-entry.validator';

export class UpdateFaqEntryUseCase implements UpdateFaqEntryInterfacePort {
  constructor(
    private readonly repository: FaqEntryRepositoryPort,
    private readonly validator: UpdateFaqEntryValidator,
  ) {}

  async execute(query: GetFaqEntryQuery, command: UpdateFaqEntryCommand): Promise<FaqEntryEntity> {
    this.validator.validate(command);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.FAQ_ENTRY_NOT_FOUND);
    }

    entity.update({
      category: command.category ?? entity.category,
      question: command.question?.trim() ?? entity.question,
      answer: command.answer?.trim() ?? entity.answer,
      position: command.position ?? entity.position,
      isPublished: command.isPublished ?? entity.isPublished,
    });

    return this.repository.save(entity);
  }
}
