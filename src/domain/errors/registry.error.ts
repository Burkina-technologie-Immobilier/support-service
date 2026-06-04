import { CodesError } from './codes.error';

export const ErrorRegistry = {
  [CodesError.PUBLIC_ID_INVALID]: { httpStatus: 400 },
  [CodesError.UUID_INVALID]: { httpStatus: 400 },
  [CodesError.EMAIL_INVALID]: { httpStatus: 400 },
  [CodesError.FULL_NAME_REQUIRED]: { httpStatus: 400 },
  [CodesError.SUBJECT_REQUIRED]: { httpStatus: 400 },
  [CodesError.MESSAGE_REQUIRED]: { httpStatus: 400 },
  [CodesError.BODY_REQUIRED]: { httpStatus: 400 },
  [CodesError.QUESTION_REQUIRED]: { httpStatus: 400 },
  [CodesError.ANSWER_REQUIRED]: { httpStatus: 400 },
  [CodesError.CATEGORY_INVALID]: { httpStatus: 400 },
  [CodesError.TICKET_STATUS_INVALID]: { httpStatus: 400 },
  [CodesError.TICKET_PRIORITY_INVALID]: { httpStatus: 400 },
  [CodesError.SENDER_TYPE_INVALID]: { httpStatus: 400 },
  [CodesError.CHAT_STATUS_INVALID]: { httpStatus: 400 },
  [CodesError.REVIEW_STATUS_INVALID]: { httpStatus: 400 },
  [CodesError.RATING_INVALID]: { httpStatus: 400 },
  [CodesError.BRANCH_ID_REQUIRED]: { httpStatus: 400 },
  [CodesError.PRODUCT_ID_REQUIRED]: { httpStatus: 400 },
  [CodesError.USER_ID_REQUIRED]: { httpStatus: 400 },
  [CodesError.URL_REQUIRED]: { httpStatus: 400 },
  [CodesError.URL_INVALID]: { httpStatus: 400 },
  [CodesError.PERMISSION_DENIED]: { httpStatus: 403 },
  [CodesError.BRANCH_ACCESS_DENIED]: { httpStatus: 403 },
  [CodesError.SCOPE_SIEGE_REQUIRED]: { httpStatus: 403 },
  [CodesError.TICKET_STATUS_TRANSITION_INVALID]: { httpStatus: 403 },
} as const satisfies Record<
  (typeof CodesError)[keyof typeof CodesError],
  { httpStatus: number }
>;
