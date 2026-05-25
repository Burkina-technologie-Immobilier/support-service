import { IsEnum, IsOptional, IsString, IsUUID, IsNotEmpty } from 'class-validator';
import { SenderTypeEnum } from 'src/domain/enums/sender-type.enum';

export class CreateTicketMessageDto {
  @IsEnum(SenderTypeEnum) senderType!: SenderTypeEnum;
  @IsOptional() @IsUUID() senderId?: string;
  @IsString() @IsNotEmpty() body!: string;
}
