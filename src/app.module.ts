import { Module } from '@nestjs/common';
import { ChatSessionModule } from './adapter/in/chat-session/chat-session.module';
import { FaqEntryModule } from './adapter/in/faq-entry/faq-entry.module';
import { ReviewModule } from './adapter/in/review/review.module';
import { TicketModule } from './adapter/in/ticket/ticket.module';

@Module({
  imports: [TicketModule, FaqEntryModule, ChatSessionModule, ReviewModule],
})
export class AppModule {}
