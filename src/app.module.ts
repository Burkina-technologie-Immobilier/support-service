import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SecurityModule } from './infrastructure/security/security.module';
import { SecurityContextMiddleware } from './infrastructure/security/security-context.middleware';
import { ChatSessionModule } from './adapter/in/chat-session/chat-session.module';
import { FaqEntryModule } from './adapter/in/faq-entry/faq-entry.module';
import { ReviewModule } from './adapter/in/review/review.module';
import { TicketModule } from './adapter/in/ticket/ticket.module';

@Module({
  imports: [SecurityModule, TicketModule, FaqEntryModule, ChatSessionModule, ReviewModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(SecurityContextMiddleware).forRoutes('*');
  }
}
