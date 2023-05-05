import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isEmpty } from 'lodash';
import { ROLE } from '@app/common';
import { ROLES_KEY } from '@app/core/decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<ROLE[]>(ROLES_KEY, context.getHandler());
    const request = context.switchToHttp().getRequest();

    // If no roles are required, then allow access or if the user is a guest then allow access
    if (isEmpty(roles) || (roles.length === 1 && roles.includes(ROLE.GUEST))) {
      return true;
    }
    const role = request.user?.role;
    const roleAuth = role && this.hasRole(role, roles);
    if (!roleAuth) {
      return false;
    }
    return true;
  }

  private hasRole(role: ROLE, roles: ROLE[]) {
    return roles.includes(role);
  }
}
