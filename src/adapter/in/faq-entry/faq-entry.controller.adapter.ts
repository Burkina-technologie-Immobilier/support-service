import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateFaqEntryDto } from 'src/application/dto/faq-entry/create-faq-entry.dto';
import { ListFaqEntryDto } from 'src/application/dto/faq-entry/list-faq-entry.dto';
import { UpdateFaqEntryDto } from 'src/application/dto/faq-entry/update-faq-entry.dto';
import { FaqEntryHttpMapper } from 'src/application/mapper/faq-entry/faq-entry-http.mapper';
import { PaginatedResponseMapper } from 'src/application/mapper/paginate/paginated-response.mapper.dto';
import { CreateFaqEntryUseCase } from 'src/application/use_case/faq-entry/create-faq-entry.usecase';
import { DeleteFaqEntryUseCase } from 'src/application/use_case/faq-entry/delete-faq-entry.usecase';
import { GetFaqEntryUseCase } from 'src/application/use_case/faq-entry/get-faq-entry.usecase';
import { ListFaqEntryUseCase } from 'src/application/use_case/faq-entry/list-faq-entry.usecase';
import { UpdateFaqEntryUseCase } from 'src/application/use_case/faq-entry/update-faq-entry.usecase';

@Controller('faq-entries')
export class FaqEntryControllerAdapter {
  constructor(
    private readonly createFaqEntry: CreateFaqEntryUseCase,
    private readonly getFaqEntry: GetFaqEntryUseCase,
    private readonly listFaqEntry: ListFaqEntryUseCase,
    private readonly updateFaqEntry: UpdateFaqEntryUseCase,
    private readonly deleteFaqEntry: DeleteFaqEntryUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateFaqEntryDto) {
    const result = await this.createFaqEntry.execute(FaqEntryHttpMapper.toCreateCommand(dto));
    return FaqEntryHttpMapper.toResponse(result);
  }

  @Get()
  async list(@Query() dto: ListFaqEntryDto) {
    const result = await this.listFaqEntry.execute(FaqEntryHttpMapper.toListQuery(dto));
    return PaginatedResponseMapper.toPaginatedDto(result, FaqEntryHttpMapper.toResponse);
  }

  @Get(':publicId')
  async get(@Param('publicId') publicId: string) {
    const result = await this.getFaqEntry.execute({ publicId });
    return FaqEntryHttpMapper.toResponse(result);
  }

  @Patch(':publicId')
  async update(@Param('publicId') publicId: string, @Body() dto: UpdateFaqEntryDto) {
    const result = await this.updateFaqEntry.execute(
      { publicId },
      FaqEntryHttpMapper.toUpdateCommand(dto),
    );
    return FaqEntryHttpMapper.toResponse(result);
  }

  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    await this.deleteFaqEntry.execute({ publicId });
    return { message: 'FAQ entry deleted successfully' };
  }
}
