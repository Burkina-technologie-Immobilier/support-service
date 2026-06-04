import { BusinessError } from 'src/domain/errors/business.error';
import { CodesError } from 'src/domain/errors/codes.error';
import { TicketStatusEnum } from 'src/domain/enums/ticket-status.enum';

const ALLOWED: Record<TicketStatusEnum, TicketStatusEnum[]> = {
  [TicketStatusEnum.OPEN]: [
    TicketStatusEnum.PENDING,
    TicketStatusEnum.RESOLVED,
    TicketStatusEnum.CLOSED,
  ],
  [TicketStatusEnum.PENDING]: [
    TicketStatusEnum.OPEN,
    TicketStatusEnum.RESOLVED,
    TicketStatusEnum.CLOSED,
  ],
  [TicketStatusEnum.RESOLVED]: [TicketStatusEnum.CLOSED, TicketStatusEnum.PENDING],
  [TicketStatusEnum.CLOSED]: [],
};

export class TicketStatusPolicy {
  assertTransition(current: TicketStatusEnum, next: TicketStatusEnum): void {
    if (current === next) {
      return;
    }
    const allowed = ALLOWED[current] ?? [];
    if (!allowed.includes(next)) {
      throw new BusinessError(CodesError.TICKET_STATUS_TRANSITION_INVALID, {
        from: current,
        to: next,
      });
    }
  }
}
