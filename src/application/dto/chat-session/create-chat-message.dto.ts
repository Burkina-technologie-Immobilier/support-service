import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SenderTypeEnum } from 'src/domain/enums/sender-type.enum';

export class CreateChatMessageDto {
  @IsEnum(SenderTypeEnum) senderType!: SenderTypeEnum;
  @IsString() @IsNotEmpty() body!: string;
}
