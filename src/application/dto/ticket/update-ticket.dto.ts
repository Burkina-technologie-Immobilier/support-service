import { IsEmail, IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { SupportCategoryEnum } from 'src/domain/enums/support-category.enum';
import { TicketPriorityEnum } from 'src/domain/enums/ticket-priority.enum';
import { TicketStatusEnum } from 'src/domain/enums/ticket-status.enum';
import { IsPhone } from 'src/lib/decorators.commons';

export class UpdateTicketDto {
  @IsOptional() @IsUUID() branchId?: string | null;
  @IsOptional() @IsUUID() userId?: string | null;
  @IsOptional() @IsString() @MaxLength(160) fullName?: string;
  @IsOptional() @IsEmail() @MaxLength(200) email?: string;
  @IsOptional() @IsPhone() phone?: string | null;
  @IsOptional() @IsEnum(SupportCategoryEnum) category?: SupportCategoryEnum;
  @IsOptional() @IsString() @MaxLength(200) subject?: string;
  @IsOptional() @IsString() message?: string;
  @IsOptional() @IsEnum(TicketStatusEnum) status?: TicketStatusEnum;
  @IsOptional() @IsEnum(TicketPriorityEnum) priority?: TicketPriorityEnum;
  @IsOptional() @IsUUID() orderId?: string | null;
}
