import { FaqEntryEntity } from 'src/domain/entities/faq-entry.entity';
import { ListFaqEntryQuery } from '../in/faq-entry/list-faq-entry.interface.port';

export interface FaqEntryRepositoryPort {
  save(entity: FaqEntryEntity): Promise<FaqEntryEntity>;
  findByPublicId(publicId: string): Promise<FaqEntryEntity | null>;
  findWithPagination(query: ListFaqEntryQuery): Promise<{ data: FaqEntryEntity[]; total: number }>;
  delete(publicId: string): Promise<void>;
  incrementViewCount(publicId: string): Promise<FaqEntryEntity>;
}
