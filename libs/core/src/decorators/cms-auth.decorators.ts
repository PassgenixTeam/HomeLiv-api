import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ROLE } from '../../../common/src/enums/role.enum';
import { RolesGuard } from '../guards/roles/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const ROLES_KEY = 'roles';

export const Auth = (...roles: ROLE[]) => {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
  );
};
