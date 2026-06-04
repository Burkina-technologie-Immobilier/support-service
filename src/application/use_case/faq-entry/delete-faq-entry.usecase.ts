import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import {
  DeleteFaqEntryInterfacePort,
  DeleteFaqEntryQuery,
} from 'src/domain/port/in/faq-entry/delete-faq-entry.interface.port';
import { FaqEntryRepositoryPort } from 'src/domain/port/out/faq-entry.repository.port';
import { DeleteFaqEntryValidator } from 'src/domain/service/validators/faq-entry/delete-faq-entry.validator';

export class DeleteFaqEntryUseCase implements DeleteFaqEntryInterfacePort {
  constructor(
    private readonly repository: FaqEntryRepositoryPort,
    private readonly validator: DeleteFaqEntryValidator,
  ) {}

  async execute(query: DeleteFaqEntryQuery): Promise<void> {
    this.validator.validate(query);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.FAQ_ENTRY_NOT_FOUND);
    }

    await this.repository.delete(query.publicId);
  }
}
