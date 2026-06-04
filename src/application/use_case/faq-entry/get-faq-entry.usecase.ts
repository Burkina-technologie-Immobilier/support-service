import { ApplicationError } from 'src/application/errors/application.error';
import { CodesError } from 'src/application/errors/codes.error';
import { FaqEntryEntity } from 'src/domain/entities/faq-entry.entity';
import {
  GetFaqEntryInterfacePort,
  GetFaqEntryQuery,
} from 'src/domain/port/in/faq-entry/get-faq-entry.interface.port';
import { FaqEntryRepositoryPort } from 'src/domain/port/out/faq-entry.repository.port';
import { GetFaqEntryValidator } from 'src/domain/service/validators/faq-entry/get-faq-entry.validator';

export class GetFaqEntryUseCase implements GetFaqEntryInterfacePort {
  constructor(
    private readonly repository: FaqEntryRepositoryPort,
    private readonly validator: GetFaqEntryValidator,
  ) {}

  async execute(query: GetFaqEntryQuery): Promise<FaqEntryEntity> {
    this.validator.validate(query);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.FAQ_ENTRY_NOT_FOUND);
    }

    return this.repository.incrementViewCount(query.publicId);
  }
}
