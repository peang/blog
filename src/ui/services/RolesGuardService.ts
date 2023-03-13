import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ContextMiddleware } from '../middlewares/ContextMiddleware';
import { RBAC } from './RBACService';

export const Action = (action: string) => SetMetadata('action', action);
export const ALL_ROLE = '*';
export const ALL_SCOPE = '*';

@Injectable()
export class RolesGuardService implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const action: any = this.reflector.get<string>('action', context.getHandler());
    if (!action) {
      return true;
    }

    const userContext = ContextMiddleware.UserContext
    if (!userContext) {
      return false;
    }
    // const actionScopes = RBAC.ActionScopes[action];
    const actionScopes = RBAC.ACTIONS[action].SCOPES;
    if (!actionScopes) {
      return false;
    }

    if (actionScopes === ALL_SCOPE) {
      return true;
    }

    const actionRoles = RBAC.ACTIONS[action].ROLES;

    if (!actionRoles) {
      return false;
    }

    if (actionRoles === ALL_ROLE) {
      return true
    }

    return true;
  }
}
