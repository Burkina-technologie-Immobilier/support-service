import { Module } from '@nestjs/common';
import { PublicIdGeneratorAdapter } from '../generate-public-id/generate.public-id.adapter';
import { TicketMessageRepositoryAdapter } from 'src/adapter/out/persistence/ticket-message.repository.adapter';
import { TicketRepositoryAdapter } from 'src/adapter/out/persistence/ticket.repository.adapter';
import { CreateTicketMessageUseCase } from 'src/application/use_case/ticket/create-ticket-message.usecase';
import { CreateTicketUseCase } from 'src/application/use_case/ticket/create-ticket.usecase';
import { DeleteTicketUseCase } from 'src/application/use_case/ticket/delete-ticket.usecase';
import { GetTicketUseCase } from 'src/application/use_case/ticket/get-ticket.usecase';
import { ListTicketMessageUseCase } from 'src/application/use_case/ticket/list-ticket-message.usecase';
import { ListTicketUseCase } from 'src/application/use_case/ticket/list-ticket.usecase';
import { UpdateTicketUseCase } from 'src/application/use_case/ticket/update-ticket.usecase';
import {
  PUBLIC_ID_GENERATOR_PORT,
  TICKET_MESSAGE_REPOSITORY_PORT,
  TICKET_REPOSITORY_PORT,
} from 'src/domain/port/tokens/tokens';
import { CreateTicketValidator } from 'src/domain/service/validators/ticket/create-ticket.validator';
import { DeleteTicketValidator } from 'src/domain/service/validators/ticket/delete-ticket.validator';
import { GetTicketValidator } from 'src/domain/service/validators/ticket/get-ticket.validator';
import { UpdateTicketValidator } from 'src/domain/service/validators/ticket/update-ticket.validator';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { TicketControllerAdapter } from './ticket.controller.adapter';

@Module({
  imports: [PrismaModule],
  controllers: [TicketControllerAdapter],
  providers: [
    { provide: TICKET_REPOSITORY_PORT, useClass: TicketRepositoryAdapter },
    { provide: TICKET_MESSAGE_REPOSITORY_PORT, useClass: TicketMessageRepositoryAdapter },
    { provide: PUBLIC_ID_GENERATOR_PORT, useClass: PublicIdGeneratorAdapter },
    CreateTicketValidator,
    UpdateTicketValidator,
    GetTicketValidator,
    DeleteTicketValidator,
    {
      provide: CreateTicketUseCase,
      useFactory: (repo, validator, idGen) => new CreateTicketUseCase(repo, validator, idGen),
      inject: [TICKET_REPOSITORY_PORT, CreateTicketValidator, PUBLIC_ID_GENERATOR_PORT],
    },
    {
      provide: GetTicketUseCase,
      useFactory: (repo, validator) => new GetTicketUseCase(repo, validator),
      inject: [TICKET_REPOSITORY_PORT, GetTicketValidator],
    },
    {
      provide: ListTicketUseCase,
      useFactory: (repo) => new ListTicketUseCase(repo),
      inject: [TICKET_REPOSITORY_PORT],
    },
    {
      provide: UpdateTicketUseCase,
      useFactory: (repo, validator) => new UpdateTicketUseCase(repo, validator),
      inject: [TICKET_REPOSITORY_PORT, UpdateTicketValidator],
    },
    {
      provide: DeleteTicketUseCase,
      useFactory: (repo, validator) => new DeleteTicketUseCase(repo, validator),
      inject: [TICKET_REPOSITORY_PORT, DeleteTicketValidator],
    },
    {
      provide: CreateTicketMessageUseCase,
      useFactory: (ticketRepo, messageRepo, idGen) =>
        new CreateTicketMessageUseCase(ticketRepo, messageRepo, idGen),
      inject: [TICKET_REPOSITORY_PORT, TICKET_MESSAGE_REPOSITORY_PORT, PUBLIC_ID_GENERATOR_PORT],
    },
    {
      provide: ListTicketMessageUseCase,
      useFactory: (ticketRepo, messageRepo) =>
        new ListTicketMessageUseCase(ticketRepo, messageRepo),
      inject: [TICKET_REPOSITORY_PORT, TICKET_MESSAGE_REPOSITORY_PORT],
    },
  ],
})
export class TicketModule {}
