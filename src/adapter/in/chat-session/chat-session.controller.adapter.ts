import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateChatMessageDto } from 'src/application/dto/chat-session/create-chat-message.dto';
import { CreateChatSessionDto } from 'src/application/dto/chat-session/create-chat-session.dto';
import { ListChatSessionDto } from 'src/application/dto/chat-session/list-chat-session.dto';
import { UpdateChatSessionDto } from 'src/application/dto/chat-session/update-chat-session.dto';
import { ChatMessageHttpMapper } from 'src/application/mapper/chat-session/chat-message-http.mapper';
import { ChatSessionHttpMapper } from 'src/application/mapper/chat-session/chat-session-http.mapper';
import { PaginatedResponseMapper } from 'src/application/mapper/paginate/paginated-response.mapper.dto';
import { CreateChatMessageUseCase } from 'src/application/use_case/chat-session/create-chat-message.usecase';
import { CreateChatSessionUseCase } from 'src/application/use_case/chat-session/create-chat-session.usecase';
import { DeleteChatSessionUseCase } from 'src/application/use_case/chat-session/delete-chat-session.usecase';
import { GetChatSessionUseCase } from 'src/application/use_case/chat-session/get-chat-session.usecase';
import { ListChatMessageUseCase } from 'src/application/use_case/chat-session/list-chat-message.usecase';
import { ListChatSessionUseCase } from 'src/application/use_case/chat-session/list-chat-session.usecase';
import { UpdateChatSessionUseCase } from 'src/application/use_case/chat-session/update-chat-session.usecase';

@Controller('chat-sessions')
export class ChatSessionControllerAdapter {
  constructor(
    private readonly createChatSession: CreateChatSessionUseCase,
    private readonly getChatSession: GetChatSessionUseCase,
    private readonly listChatSession: ListChatSessionUseCase,
    private readonly updateChatSession: UpdateChatSessionUseCase,
    private readonly deleteChatSession: DeleteChatSessionUseCase,
    private readonly createChatMessage: CreateChatMessageUseCase,
    private readonly listChatMessage: ListChatMessageUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateChatSessionDto) {
    const result = await this.createChatSession.execute(ChatSessionHttpMapper.toCreateCommand(dto));
    return ChatSessionHttpMapper.toResponse(result);
  }

  @Get()
  async list(@Query() dto: ListChatSessionDto) {
    const result = await this.listChatSession.execute(ChatSessionHttpMapper.toListQuery(dto));
    return PaginatedResponseMapper.toPaginatedDto(result, ChatSessionHttpMapper.toResponse);
  }

  @Get(':publicId')
  async get(@Param('publicId') publicId: string) {
    const result = await this.getChatSession.execute({ publicId });
    return ChatSessionHttpMapper.toResponse(result);
  }

  @Patch(':publicId')
  async update(@Param('publicId') publicId: string, @Body() dto: UpdateChatSessionDto) {
    const result = await this.updateChatSession.execute(
      { publicId },
      ChatSessionHttpMapper.toUpdateCommand(dto),
    );
    return ChatSessionHttpMapper.toResponse(result);
  }

  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    await this.deleteChatSession.execute({ publicId });
    return { message: 'Chat session deleted successfully' };
  }

  @Post(':publicId/messages')
  async createMessage(
    @Param('publicId') publicId: string,
    @Body() dto: CreateChatMessageDto,
  ) {
    const result = await this.createChatMessage.execute(
      ChatMessageHttpMapper.toCreateCommand(publicId, dto),
    );
    return ChatMessageHttpMapper.toResponse(result);
  }

  @Get(':publicId/messages')
  async listMessages(@Param('publicId') publicId: string) {
    const result = await this.listChatMessage.execute({ sessionPublicId: publicId });
    return result.map(ChatMessageHttpMapper.toResponse);
  }
}
