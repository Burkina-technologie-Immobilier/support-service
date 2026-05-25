import { FaqEntryEntity } from 'src/domain/entities/faq-entry.entity';

export interface GetFaqEntryQuery {
  publicId: string;
}

export interface GetFaqEntryInterfacePort {
  execute(query: GetFaqEntryQuery): Promise<FaqEntryEntity>;
}
