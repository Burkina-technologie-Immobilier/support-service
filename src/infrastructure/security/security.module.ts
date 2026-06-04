import { Global, Module } from '@nestjs/common';
import { SECURITY_CONTEXT_PORT } from 'src/domain/port/out/security-context.port';
import { AccessGuard } from 'src/domain/service/policies/access.guard';
import { BranchScopePolicy } from 'src/domain/service/policies/branch-scope.policy';
import { PermissionPolicy } from 'src/domain/service/policies/permission.policy';
import { ReviewModerationPolicy } from 'src/domain/service/policies/review-moderation.policy';
import { TicketStatusPolicy } from 'src/domain/service/policies/ticket-status.policy';
import { RequestSecurityContextAdapter } from './request-security-context.adapter';

@Global()
@Module({
  providers: [
    RequestSecurityContextAdapter,
    { provide: SECURITY_CONTEXT_PORT, useExisting: RequestSecurityContextAdapter },
    PermissionPolicy,
    BranchScopePolicy,
    TicketStatusPolicy,
    ReviewModerationPolicy,
    {
      provide: AccessGuard,
      useFactory: (
        security: RequestSecurityContextAdapter,
        permission: PermissionPolicy,
        branchScope: BranchScopePolicy,
      ) => new AccessGuard(security, permission, branchScope),
      inject: [RequestSecurityContextAdapter, PermissionPolicy, BranchScopePolicy],
    },
  ],
  exports: [
    SECURITY_CONTEXT_PORT,
    AccessGuard,
    PermissionPolicy,
    BranchScopePolicy,
    TicketStatusPolicy,
    ReviewModerationPolicy,
  ],
})
export class SecurityModule {}
