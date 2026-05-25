import { Module } from '@nestjs/common';
import { PublicIdGeneratorAdapter } from '../generate-public-id/generate.public-id.adapter';
import { FaqEntryRepositoryAdapter } from 'src/adapter/out/persistence/faq-entry.repository.adapter';
import { CreateFaqEntryUseCase } from 'src/application/use_case/faq-entry/create-faq-entry.usecase';
import { DeleteFaqEntryUseCase } from 'src/application/use_case/faq-entry/delete-faq-entry.usecase';
import { GetFaqEntryUseCase } from 'src/application/use_case/faq-entry/get-faq-entry.usecase';
import { ListFaqEntryUseCase } from 'src/application/use_case/faq-entry/list-faq-entry.usecase';
import { UpdateFaqEntryUseCase } from 'src/application/use_case/faq-entry/update-faq-entry.usecase';
import {
  FAQ_ENTRY_REPOSITORY_PORT,
  PUBLIC_ID_GENERATOR_PORT,
} from 'src/domain/port/tokens/tokens';
import { CreateFaqEntryValidator } from 'src/domain/service/validators/faq-entry/create-faq-entry.validator';
import { DeleteFaqEntryValidator } from 'src/domain/service/validators/faq-entry/delete-faq-entry.validator';
import { GetFaqEntryValidator } from 'src/domain/service/validators/faq-entry/get-faq-entry.validator';
import { UpdateFaqEntryValidator } from 'src/domain/service/validators/faq-entry/update-faq-entry.validator';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { FaqEntryControllerAdapter } from './faq-entry.controller.adapter';

@Module({
  imports: [PrismaModule],
  controllers: [FaqEntryControllerAdapter],
  providers: [
    { provide: FAQ_ENTRY_REPOSITORY_PORT, useClass: FaqEntryRepositoryAdapter },
    { provide: PUBLIC_ID_GENERATOR_PORT, useClass: PublicIdGeneratorAdapter },
    CreateFaqEntryValidator,
    UpdateFaqEntryValidator,
    GetFaqEntryValidator,
    DeleteFaqEntryValidator,
    {
      provide: CreateFaqEntryUseCase,
      useFactory: (repo, validator, idGen) => new CreateFaqEntryUseCase(repo, validator, idGen),
      inject: [FAQ_ENTRY_REPOSITORY_PORT, CreateFaqEntryValidator, PUBLIC_ID_GENERATOR_PORT],
    },
    {
      provide: GetFaqEntryUseCase,
      useFactory: (repo, validator) => new GetFaqEntryUseCase(repo, validator),
      inject: [FAQ_ENTRY_REPOSITORY_PORT, GetFaqEntryValidator],
    },
    {
      provide: ListFaqEntryUseCase,
      useFactory: (repo) => new ListFaqEntryUseCase(repo),
      inject: [FAQ_ENTRY_REPOSITORY_PORT],
    },
    {
      provide: UpdateFaqEntryUseCase,
      useFactory: (repo, validator) => new UpdateFaqEntryUseCase(repo, validator),
      inject: [FAQ_ENTRY_REPOSITORY_PORT, UpdateFaqEntryValidator],
    },
    {
      provide: DeleteFaqEntryUseCase,
      useFactory: (repo, validator) => new DeleteFaqEntryUseCase(repo, validator),
      inject: [FAQ_ENTRY_REPOSITORY_PORT, DeleteFaqEntryValidator],
    },
  ],
})
export class FaqEntryModule {}
