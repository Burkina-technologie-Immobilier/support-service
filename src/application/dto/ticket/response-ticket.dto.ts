import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';
import { SupportCategoryEnum } from 'src/domain/enums/support-category.enum';
import { TicketPriorityEnum } from 'src/domain/enums/ticket-priority.enum';
import { TicketStatusEnum } from 'src/domain/enums/ticket-status.enum';

export class ResponseTicketDto {
  @IsNanoId() @IsNotEmpty() publicId!: string;
  @IsOptional() @IsUUID() branchId?: string;
  @IsOptional() @IsUUID() userId?: string;
  @IsNotEmpty() @IsString() @MaxLength(160) fullName!: string;
  @IsEmail() @MaxLength(200) email!: string;
  @IsOptional() @IsString() phone?: string;
  @IsEnum(SupportCategoryEnum) category!: SupportCategoryEnum;
  @IsNotEmpty() @IsString() @MaxLength(200) subject!: string;
  @IsNotEmpty() @IsString() message!: string;
  @IsEnum(TicketStatusEnum) status!: TicketStatusEnum;
  @IsEnum(TicketPriorityEnum) priority!: TicketPriorityEnum;
  @IsOptional() @IsUUID() orderId?: string;
}
