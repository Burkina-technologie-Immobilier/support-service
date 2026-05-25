import { CreateFaqEntryDto } from 'src/application/dto/faq-entry/create-faq-entry.dto';
import { ListFaqEntryDto } from 'src/application/dto/faq-entry/list-faq-entry.dto';
import { ResponseFaqEntryDto } from 'src/application/dto/faq-entry/response-faq-entry.dto';
import { UpdateFaqEntryDto } from 'src/application/dto/faq-entry/update-faq-entry.dto';
import { FaqEntryEntity } from 'src/domain/entities/faq-entry.entity';
import { CreateFaqEntryCommand } from 'src/domain/port/in/faq-entry/create-faq-entry.interface.port';
import { ListFaqEntryQuery } from 'src/domain/port/in/faq-entry/list-faq-entry.interface.port';
import { UpdateFaqEntryCommand } from 'src/domain/port/in/faq-entry/update-faq-entry.interface.port';

export class FaqEntryHttpMapper {
  static toCreateCommand(dto: CreateFaqEntryDto): CreateFaqEntryCommand {
    return {
      category: dto.category,
      question: dto.question,
      answer: dto.answer,
      position: dto.position,
      isPublished: dto.isPublished,
    };
  }

  static toUpdateCommand(dto: UpdateFaqEntryDto): UpdateFaqEntryCommand {
    return {
      category: dto.category,
      question: dto.question,
      answer: dto.answer,
      position: dto.position,
      isPublished: dto.isPublished,
    };
  }

  static toListQuery(dto: ListFaqEntryDto): ListFaqEntryQuery {
    return {
      page: dto.page,
      limit: dto.limit,
      category: dto.category,
      isPublished: dto.isPublished,
    };
  }

  static toResponse(entity: FaqEntryEntity): ResponseFaqEntryDto {
    return {
      publicId: entity.publicId,
      category: entity.category,
      question: entity.question,
      answer: entity.answer,
      position: entity.position,
      isPublished: entity.isPublished,
      viewCount: entity.viewCount,
    };
  }
}
