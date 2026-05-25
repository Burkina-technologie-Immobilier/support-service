import { FaqEntryEntity } from 'src/domain/entities/faq-entry.entity';
import { SupportCategoryEnum } from 'src/domain/enums/support-category.enum';

export interface CreateFaqEntryCommand {
  category: SupportCategoryEnum;
  question: string;
  answer: string;
  position?: number;
  isPublished?: boolean;
}

export interface CreateFaqEntryInterfacePort {
  execute(command: CreateFaqEntryCommand): Promise<FaqEntryEntity>;
}
