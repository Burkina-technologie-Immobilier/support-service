import { BusinessError } from 'src/domain/errors/business.error';
import { CodesError } from 'src/domain/errors/codes.error';
import { SupportCategoryEnum } from 'src/domain/enums/support-category.enum';
import { TicketStatusEnum } from 'src/domain/enums/ticket-status.enum';
import { TicketPriorityEnum } from 'src/domain/enums/ticket-priority.enum';
import { SenderTypeEnum } from 'src/domain/enums/sender-type.enum';
import { ChatSessionStatusEnum } from 'src/domain/enums/chat-session-status.enum';
import { ReviewStatusEnum } from 'src/domain/enums/review-status.enum';
import { Utils } from './utils.commons';

export class DomainValidation {
  static assertPublicId(publicId: string): void {
    if (!Utils.nanoidRegex.test(publicId)) {
      throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
    }
  }

  static assertUuid(value: string | undefined, code: typeof CodesError.UUID_INVALID): void {
    if (value && !Utils.uuidRegex.test(value)) {
      throw new BusinessError(code);
    }
  }

  static assertEmail(email: string): void {
    if (!Utils.emailRegex.test(email)) {
      throw new BusinessError(CodesError.EMAIL_INVALID);
    }
  }

  static assertCategory(category: SupportCategoryEnum): void {
    if (!Object.values(SupportCategoryEnum).includes(category)) {
      throw new BusinessError(CodesError.CATEGORY_INVALID);
    }
  }

  static assertTicketStatus(status: TicketStatusEnum): void {
    if (!Object.values(TicketStatusEnum).includes(status)) {
      throw new BusinessError(CodesError.TICKET_STATUS_INVALID);
    }
  }

  static assertTicketPriority(priority: TicketPriorityEnum): void {
    if (!Object.values(TicketPriorityEnum).includes(priority)) {
      throw new BusinessError(CodesError.TICKET_PRIORITY_INVALID);
    }
  }

  static assertSenderType(senderType: SenderTypeEnum, allowBot = false): void {
    const allowed = allowBot
      ? Object.values(SenderTypeEnum)
      : [SenderTypeEnum.CUSTOMER, SenderTypeEnum.AGENT];
    if (!allowed.includes(senderType)) {
      throw new BusinessError(CodesError.SENDER_TYPE_INVALID);
    }
  }

  static assertChatStatus(status: ChatSessionStatusEnum): void {
    if (!Object.values(ChatSessionStatusEnum).includes(status)) {
      throw new BusinessError(CodesError.CHAT_STATUS_INVALID);
    }
  }

  static assertReviewStatus(status: ReviewStatusEnum): void {
    if (!Object.values(ReviewStatusEnum).includes(status)) {
      throw new BusinessError(CodesError.REVIEW_STATUS_INVALID);
    }
  }

  static assertRating(rating: number): void {
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw new BusinessError(CodesError.RATING_INVALID);
    }
  }
}
