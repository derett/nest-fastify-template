/* eslint-disable @typescript-eslint/no-var-requires */
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { parse } from 'ini';
import { join } from 'path';
import { loadString } from '../helpers/env.helper';

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

const dataFolderPath = loadString('DATA_FOLDER_PATH');

if (!existsSync(dataFolderPath)) {
  mkdirSync(dataFolderPath, { recursive: true });
}

export default {
  productionMode,
  jwtSecret: loadString('JWT_SECRET'),
  dataFolderPath,
};
