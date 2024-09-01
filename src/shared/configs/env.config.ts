/* eslint-disable @typescript-eslint/no-var-requires */
import { readFileSync } from 'fs';
import { parse } from 'ini';
import { join } from 'path';
import { loadNumber, loadString } from '../helpers/env.helper';

let productionMode = true;

try {
  const configFile = readFileSync('config.ini', 'utf-8');
  const configData = parse(configFile);

  productionMode = configData.NODE_ENV
    ? configData.NODE_ENV === 'production'
    : true;
} catch {
  console.error('config.ini file is missing or invalid using default settings');
}

process.env.NODE_ENV = productionMode ? 'production' : 'development';

const envPath = productionMode ? '.env' : '.dev.env';
const basePath = process.cwd();

require('dotenv').config({ path: join(basePath, '.common.env') });
require('dotenv').config({ path: join(basePath, envPath) });

export default {
  productionMode,
  port: loadNumber('PORT', { defaultValue: 5000 }),
  jwtSecret: loadString('JWT_SECRET'),
  jwtExpireSecs: loadNumber('JWT_EXPIRE_SECS', { defaultValue: 60 * 60 * 24 }),
};
