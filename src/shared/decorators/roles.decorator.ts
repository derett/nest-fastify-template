import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/shared/enums/roles.enum';

export const RolesDec = (...roles: Roles[]) => SetMetadata('roles', roles);
