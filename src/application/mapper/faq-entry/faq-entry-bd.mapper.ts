import { FaqEntryTable } from '@prisma/client';
import { FaqEntryEntity } from 'src/domain/entities/faq-entry.entity';
import { SupportCategoryEnum } from 'src/domain/enums/support-category.enum';

export class FaqEntryBdMapper {
  static toDomain(row: FaqEntryTable): FaqEntryEntity {
    return new FaqEntryEntity({
      id: row.id,
      publicId: row.public_id,
      category: row.category as SupportCategoryEnum,
      question: row.question,
      answer: row.answer,
      position: row.position,
      isPublished: row.is_published,
      viewCount: row.view_count,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  static toPersistence(entity: FaqEntryEntity) {
    return {
      public_id: entity.publicId,
      category: entity.category,
      question: entity.question,
      answer: entity.answer,
      position: entity.position,
      is_published: entity.isPublished,
      view_count: entity.viewCount,
    };
  }
}
