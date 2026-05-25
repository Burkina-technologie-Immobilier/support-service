import { FaqEntryEntity } from 'src/domain/entities/faq-entry.entity';
import { SupportCategoryEnum } from 'src/domain/enums/support-category.enum';
import { GetFaqEntryQuery } from './get-faq-entry.interface.port';

export interface UpdateFaqEntryCommand {
  category?: SupportCategoryEnum;
  question?: string;
  answer?: string;
  position?: number;
  isPublished?: boolean;
}

export interface UpdateFaqEntryInterfacePort {
  execute(query: GetFaqEntryQuery, command: UpdateFaqEntryCommand): Promise<FaqEntryEntity>;
}
