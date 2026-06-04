import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTicketMessageDto } from 'src/application/dto/ticket/create-ticket-message.dto';
import { CreateTicketDto } from 'src/application/dto/ticket/create-ticket.dto';
import { ListTicketDto } from 'src/application/dto/ticket/list-ticket.dto';
import { UpdateTicketDto } from 'src/application/dto/ticket/update-ticket.dto';
import { PaginatedResponseMapper } from 'src/application/mapper/paginate/paginated-response.mapper.dto';
import { TicketMessageHttpMapper } from 'src/application/mapper/ticket/ticket-message-http.mapper';
import { TicketHttpMapper } from 'src/application/mapper/ticket/ticket-http.mapper';
import { CreateTicketMessageUseCase } from 'src/application/use_case/ticket/create-ticket-message.usecase';
import { CreateTicketUseCase } from 'src/application/use_case/ticket/create-ticket.usecase';
import { DeleteTicketUseCase } from 'src/application/use_case/ticket/delete-ticket.usecase';
import { GetTicketUseCase } from 'src/application/use_case/ticket/get-ticket.usecase';
import { ListTicketMessageUseCase } from 'src/application/use_case/ticket/list-ticket-message.usecase';
import { ListTicketUseCase } from 'src/application/use_case/ticket/list-ticket.usecase';
import { UpdateTicketUseCase } from 'src/application/use_case/ticket/update-ticket.usecase';

@Controller('tickets')
export class TicketControllerAdapter {
  constructor(
    private readonly createTicket: CreateTicketUseCase,
    private readonly getTicket: GetTicketUseCase,
    private readonly listTicket: ListTicketUseCase,
    private readonly updateTicket: UpdateTicketUseCase,
    private readonly deleteTicket: DeleteTicketUseCase,
    private readonly createTicketMessage: CreateTicketMessageUseCase,
    private readonly listTicketMessage: ListTicketMessageUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateTicketDto) {
    const result = await this.createTicket.execute(TicketHttpMapper.toCreateCommand(dto));
    return TicketHttpMapper.toResponse(result);
  }

  @Get()
  async list(@Query() dto: ListTicketDto) {
    const result = await this.listTicket.execute(TicketHttpMapper.toListQuery(dto));
    return PaginatedResponseMapper.toPaginatedDto(result, TicketHttpMapper.toResponse);
  }

  @Get(':publicId')
  async get(@Param('publicId') publicId: string) {
    const result = await this.getTicket.execute({ publicId });
    return TicketHttpMapper.toResponse(result);
  }

  @Patch(':publicId')
  async update(@Param('publicId') publicId: string, @Body() dto: UpdateTicketDto) {
    const result = await this.updateTicket.execute(
      { publicId },
      TicketHttpMapper.toUpdateCommand(dto),
    );
    return TicketHttpMapper.toResponse(result);
  }

  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    await this.deleteTicket.execute({ publicId });
    return { message: 'Ticket deleted successfully' };
  }

  @Post(':publicId/messages')
  async createMessage(
    @Param('publicId') publicId: string,
    @Body() dto: CreateTicketMessageDto,
  ) {
    const result = await this.createTicketMessage.execute(
      TicketMessageHttpMapper.toCreateCommand(publicId, dto),
    );
    return TicketMessageHttpMapper.toResponse(result);
  }

  @Get(':publicId/messages')
  async listMessages(@Param('publicId') publicId: string) {
    const result = await this.listTicketMessage.execute({ ticketPublicId: publicId });
    return result.map(TicketMessageHttpMapper.toResponse);
  }
}
