import { Module } from '@nestjs/common';
import { PublicIdGeneratorAdapter } from '../generate-public-id/generate.public-id.adapter';
import { ChatMessageRepositoryAdapter } from 'src/adapter/out/persistence/chat-message.repository.adapter';
import { ChatSessionRepositoryAdapter } from 'src/adapter/out/persistence/chat-session.repository.adapter';
import { CreateChatMessageUseCase } from 'src/application/use_case/chat-session/create-chat-message.usecase';
import { CreateChatSessionUseCase } from 'src/application/use_case/chat-session/create-chat-session.usecase';
import { DeleteChatSessionUseCase } from 'src/application/use_case/chat-session/delete-chat-session.usecase';
import { GetChatSessionUseCase } from 'src/application/use_case/chat-session/get-chat-session.usecase';
import { ListChatMessageUseCase } from 'src/application/use_case/chat-session/list-chat-message.usecase';
import { ListChatSessionUseCase } from 'src/application/use_case/chat-session/list-chat-session.usecase';
import { UpdateChatSessionUseCase } from 'src/application/use_case/chat-session/update-chat-session.usecase';
import {
  CHAT_MESSAGE_REPOSITORY_PORT,
  CHAT_SESSION_REPOSITORY_PORT,
  PUBLIC_ID_GENERATOR_PORT,
} from 'src/domain/port/tokens/tokens';
import { CreateChatSessionValidator } from 'src/domain/service/validators/chat-session/create-chat-session.validator';
import { DeleteChatSessionValidator } from 'src/domain/service/validators/chat-session/delete-chat-session.validator';
import { GetChatSessionValidator } from 'src/domain/service/validators/chat-session/get-chat-session.validator';
import { UpdateChatSessionValidator } from 'src/domain/service/validators/chat-session/update-chat-session.validator';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { ChatSessionControllerAdapter } from './chat-session.controller.adapter';

@Module({
  imports: [PrismaModule],
  controllers: [ChatSessionControllerAdapter],
  providers: [
    { provide: CHAT_SESSION_REPOSITORY_PORT, useClass: ChatSessionRepositoryAdapter },
    { provide: CHAT_MESSAGE_REPOSITORY_PORT, useClass: ChatMessageRepositoryAdapter },
    { provide: PUBLIC_ID_GENERATOR_PORT, useClass: PublicIdGeneratorAdapter },
    CreateChatSessionValidator,
    UpdateChatSessionValidator,
    GetChatSessionValidator,
    DeleteChatSessionValidator,
    {
      provide: CreateChatSessionUseCase,
      useFactory: (repo, validator, idGen) =>
        new CreateChatSessionUseCase(repo, validator, idGen),
      inject: [CHAT_SESSION_REPOSITORY_PORT, CreateChatSessionValidator, PUBLIC_ID_GENERATOR_PORT],
    },
    {
      provide: GetChatSessionUseCase,
      useFactory: (repo, validator) => new GetChatSessionUseCase(repo, validator),
      inject: [CHAT_SESSION_REPOSITORY_PORT, GetChatSessionValidator],
    },
    {
      provide: ListChatSessionUseCase,
      useFactory: (repo) => new ListChatSessionUseCase(repo),
      inject: [CHAT_SESSION_REPOSITORY_PORT],
    },
    {
      provide: UpdateChatSessionUseCase,
      useFactory: (repo, validator) => new UpdateChatSessionUseCase(repo, validator),
      inject: [CHAT_SESSION_REPOSITORY_PORT, UpdateChatSessionValidator],
    },
    {
      provide: DeleteChatSessionUseCase,
      useFactory: (repo, validator) => new DeleteChatSessionUseCase(repo, validator),
      inject: [CHAT_SESSION_REPOSITORY_PORT, DeleteChatSessionValidator],
    },
    {
      provide: CreateChatMessageUseCase,
      useFactory: (sessionRepo, messageRepo, idGen) =>
        new CreateChatMessageUseCase(sessionRepo, messageRepo, idGen),
      inject: [CHAT_SESSION_REPOSITORY_PORT, CHAT_MESSAGE_REPOSITORY_PORT, PUBLIC_ID_GENERATOR_PORT],
    },
    {
      provide: ListChatMessageUseCase,
      useFactory: (sessionRepo, messageRepo) =>
        new ListChatMessageUseCase(sessionRepo, messageRepo),
      inject: [CHAT_SESSION_REPOSITORY_PORT, CHAT_MESSAGE_REPOSITORY_PORT],
    },
  ],
})
export class ChatSessionModule {}
