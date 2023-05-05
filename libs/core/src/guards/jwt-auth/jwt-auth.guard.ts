import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { HTTP_METHOD } from '../../../../common/src/enums/http-method.enum';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@app/core/decorators';
import { ROLE } from '@app/common';

const routerPathPassAuth = [
  // {
  //   path: '',
  //   method: HTTP_METHOD.GET,
  // }
];

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<ROLE[]>(ROLES_KEY, context.getHandler());

    const req: Request = context.switchToHttp().getRequest();

    const route: string = req.route.path;
    const method = req.method;

    const bearerToken = req.headers.authorization?.trim();

    if (roles.includes(ROLE.GUEST) && !bearerToken) {
      return true;
    }

    return (await super.canActivate(context)) as boolean;
  }
}
