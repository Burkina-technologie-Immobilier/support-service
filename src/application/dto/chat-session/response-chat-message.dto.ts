import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';
import { SenderTypeEnum } from 'src/domain/enums/sender-type.enum';

export class ResponseChatMessageDto {
  @IsNanoId() @IsNotEmpty() publicId!: string;
  @IsEnum(SenderTypeEnum) senderType!: SenderTypeEnum;
  @IsNotEmpty() @IsString() body!: string;
}
