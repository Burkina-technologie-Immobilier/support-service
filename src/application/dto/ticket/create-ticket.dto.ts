import { IsEmail, IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { SupportCategoryEnum } from 'src/domain/enums/support-category.enum';
import { IsPhone } from 'src/lib/decorators.commons';

export class CreateTicketDto {
  @IsOptional() @IsUUID() branchId?: string;
  @IsOptional() @IsUUID() userId?: string;
  @IsString() @MaxLength(160) fullName!: string;
  @IsEmail() @MaxLength(200) email!: string;
  @IsOptional() @IsPhone() phone?: string;
  @IsEnum(SupportCategoryEnum) category!: SupportCategoryEnum;
  @IsString() @MaxLength(200) subject!: string;
  @IsString() message!: string;
  @IsOptional() @IsUUID() orderId?: string;
}
