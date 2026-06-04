import { CreateTicketDto } from 'src/application/dto/ticket/create-ticket.dto';
import { ListTicketDto } from 'src/application/dto/ticket/list-ticket.dto';
import { ResponseTicketDto } from 'src/application/dto/ticket/response-ticket.dto';
import { UpdateTicketDto } from 'src/application/dto/ticket/update-ticket.dto';
import { TicketEntity } from 'src/domain/entities/ticket.entity';
import { CreateTicketCommand } from 'src/domain/port/in/ticket/create-ticket.interface.port';
import { ListTicketQuery } from 'src/domain/port/in/ticket/list-ticket.interface.port';
import { UpdateTicketCommand } from 'src/domain/port/in/ticket/update-ticket.interface.port';

export class TicketHttpMapper {
  static toCreateCommand(dto: CreateTicketDto): CreateTicketCommand {
    return {
      branchId: dto.branchId,
      userId: dto.userId,
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
      category: dto.category,
      subject: dto.subject,
      message: dto.message,
      orderId: dto.orderId,
    };
  }

  static toUpdateCommand(dto: UpdateTicketDto): UpdateTicketCommand {
    return {
      category: dto.category,
      subject: dto.subject,
      message: dto.message,
      status: dto.status,
      priority: dto.priority,
    };
  }

  static toListQuery(dto: ListTicketDto): ListTicketQuery {
    return {
      page: dto.page,
      limit: dto.limit,
      status: dto.status,
      category: dto.category,
      branchId: dto.branchId,
      userId: dto.userId,
    };
  }

  static toResponse(entity: TicketEntity): ResponseTicketDto {
    return {
      publicId: entity.publicId,
      branchId: entity.branchId,
      userId: entity.userId,
      fullName: entity.fullName,
      email: entity.email,
      phone: entity.phone,
      category: entity.category,
      subject: entity.subject,
      message: entity.message,
      status: entity.status,
      priority: entity.priority,
      orderId: entity.orderId,
    };
  }
}
