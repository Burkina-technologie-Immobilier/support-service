import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { SupportCategoryEnum } from 'src/domain/enums/support-category.enum';
import { TicketPriorityEnum } from 'src/domain/enums/ticket-priority.enum';
import { TicketStatusEnum } from 'src/domain/enums/ticket-status.enum';

export class ListTicketDto {
  @Type(() => Number) @IsInt() @Min(1) page: number = 1;
  @Type(() => Number) @IsInt() @Min(1) @Max(100) limit: number = 10;
  @IsOptional() @IsEnum(TicketStatusEnum) status?: TicketStatusEnum;
  @IsOptional() @IsEnum(TicketPriorityEnum) priority?: TicketPriorityEnum;
  @IsOptional() @IsEnum(SupportCategoryEnum) category?: SupportCategoryEnum;
  @IsOptional() @IsUUID() branchId?: string;
  @IsOptional() @IsUUID() userId?: string;
  @IsOptional() @IsEmail() email?: string;
}
