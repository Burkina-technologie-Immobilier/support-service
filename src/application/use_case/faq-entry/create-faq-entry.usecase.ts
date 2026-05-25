import { FaqEntryEntity } from 'src/domain/entities/faq-entry.entity';
import {
  CreateFaqEntryCommand,
  CreateFaqEntryInterfacePort,
} from 'src/domain/port/in/faq-entry/create-faq-entry.interface.port';
import { PublicIdGeneratorPort } from 'src/domain/port/in/generate-public-id/generator-public-id.port';
import { FaqEntryRepositoryPort } from 'src/domain/port/out/faq-entry.repository.port';
import { CreateFaqEntryValidator } from 'src/domain/service/validators/faq-entry/create-faq-entry.validator';

export class CreateFaqEntryUseCase implements CreateFaqEntryInterfacePort {
  constructor(
    private readonly repository: FaqEntryRepositoryPort,
    private readonly validator: CreateFaqEntryValidator,
    private readonly publicIdGenerator: PublicIdGeneratorPort,
  ) {}

  async execute(command: CreateFaqEntryCommand): Promise<FaqEntryEntity> {
    this.validator.validate(command);

    const entity = new FaqEntryEntity({
      publicId: this.publicIdGenerator.generateNanoid(),
      category: command.category,
      question: command.question.trim(),
      answer: command.answer.trim(),
      position: command.position ?? 0,
      isPublished: command.isPublished ?? true,
      viewCount: 0,
    });

    return this.repository.save(entity);
  }
}
