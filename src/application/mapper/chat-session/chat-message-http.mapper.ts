import { CreateChatMessageDto } from 'src/application/dto/chat-session/create-chat-message.dto';
import { ResponseChatMessageDto } from 'src/application/dto/chat-session/response-chat-message.dto';
import { ChatMessageEntity } from 'src/domain/entities/chat-message.entity';
import { CreateChatMessageCommand } from 'src/domain/port/in/chat-session/create-chat-message.interface.port';

export class ChatMessageHttpMapper {
  static toCreateCommand(
    sessionPublicId: string,
    dto: CreateChatMessageDto,
  ): CreateChatMessageCommand {
    return {
      sessionPublicId,
      senderType: dto.senderType,
      body: dto.body,
    };
  }

  static toResponse(entity: ChatMessageEntity): ResponseChatMessageDto {
    return {
      publicId: entity.publicId,
      senderType: entity.senderType,
      body: entity.body,
    };
  }
}
