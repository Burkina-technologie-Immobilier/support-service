export const MeublezonePermission = {
  TICKET_READ: 'support:ticket:read',
  TICKET_WRITE: 'support:ticket:write',
  TICKET_ASSIGN: 'support:ticket:assign',
  REVIEW_READ: 'support:review:read',
  REVIEW_WRITE: 'support:review:write',
  REVIEW_MODERATE: 'support:review:moderate',
  FAQ_READ: 'support:faq:read',
  FAQ_WRITE: 'support:faq:write',
  CHAT_READ: 'support:chat:read',
  CHAT_WRITE: 'support:chat:write',
} as const;

export type MeublezonePermission =
  (typeof MeublezonePermission)[keyof typeof MeublezonePermission];
