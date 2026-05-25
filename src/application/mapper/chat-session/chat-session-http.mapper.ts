import { CreateChatSessionDto } from 'src/application/dto/chat-session/create-chat-session.dto';
import { ListChatSessionDto } from 'src/application/dto/chat-session/list-chat-session.dto';
import { ResponseChatSessionDto } from 'src/application/dto/chat-session/response-chat-session.dto';
import { UpdateChatSessionDto } from 'src/application/dto/chat-session/update-chat-session.dto';
import { ChatSessionEntity } from 'src/domain/entities/chat-session.entity';
import { CreateChatSessionCommand } from 'src/domain/port/in/chat-session/create-chat-session.interface.port';
import { ListChatSessionQuery } from 'src/domain/port/in/chat-session/list-chat-session.interface.port';
import { UpdateChatSessionCommand } from 'src/domain/port/in/chat-session/update-chat-session.interface.port';

export class ChatSessionHttpMapper {
  static toCreateCommand(dto: CreateChatSessionDto): CreateChatSessionCommand {
    return {
      userId: dto.userId,
    };
  }

  static toUpdateCommand(dto: UpdateChatSessionDto): UpdateChatSessionCommand {
    return {
      status: dto.status,
      agentId: dto.agentId,
    };
  }

  static toListQuery(dto: ListChatSessionDto): ListChatSessionQuery {
    return {
      page: dto.page,
      limit: dto.limit,
      status: dto.status,
      userId: dto.userId,
      agentId: dto.agentId,
    };
  }

  static toResponse(entity: ChatSessionEntity): ResponseChatSessionDto {
    return {
      publicId: entity.publicId,
      userId: entity.userId,
      agentId: entity.agentId,
      status: entity.status,
    };
  }
}
