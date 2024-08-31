import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { loadNumber, loadString } from '../helpers/env.helper';

export default {
  type: 'postgres',
  dialect: 'postgres',
  host: loadString('DB_HOST', { defaultValue: 'localhost' }),
  port: loadNumber('DB_PORT', { defaultValue: 5432 }),
  username: loadString('DB_USER'),
  password: loadString('DB_PASS'),
  database: loadString('DB_NAME'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  sync: {
    alter: true,
    force: false,
  },
  synchronize: true,
  autoLoadModels: true,
} as SequelizeModuleOptions;
