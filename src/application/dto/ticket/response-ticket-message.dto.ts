import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';
import { SenderTypeEnum } from 'src/domain/enums/sender-type.enum';

export class ResponseTicketMessageDto {
  @IsNanoId() @IsNotEmpty() publicId!: string;
  @IsEnum(SenderTypeEnum) senderType!: SenderTypeEnum;
  @IsOptional() @IsUUID() senderId?: string;
  @IsNotEmpty() @IsString() body!: string;
}
