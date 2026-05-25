import { CodesError } from './codes.error';

export const ErrorRegistry = {
  [CodesError.DATA_INVALID]: { httpStatus: 400 },
  [CodesError.TICKET_NOT_FOUND]: { httpStatus: 404 },
  [CodesError.TICKET_MESSAGE_NOT_FOUND]: { httpStatus: 404 },
  [CodesError.FAQ_ENTRY_NOT_FOUND]: { httpStatus: 404 },
  [CodesError.CHAT_SESSION_NOT_FOUND]: { httpStatus: 404 },
  [CodesError.CHAT_MESSAGE_NOT_FOUND]: { httpStatus: 404 },
  [CodesError.REVIEW_NOT_FOUND]: { httpStatus: 404 },
  [CodesError.REVIEW_PHOTO_NOT_FOUND]: { httpStatus: 404 },
  [CodesError.DUPLICATE_REVIEW]: { httpStatus: 409 },
} as const satisfies Record<
  (typeof CodesError)[keyof typeof CodesError],
  { httpStatus: number }
>;
