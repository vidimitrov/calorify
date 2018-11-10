import devCfg from './env/development';
import testCfg from './env/test';
import prodCfg from './env/production';

const ENV = process.env.NODE_ENV;
let config;

switch (ENV) {
  case 'development':
    config = devCfg;
    break;
  case 'test':
    config = testCfg;
    break;
  case 'production':
    config = prodCfg;
    break;
  default:
    break;
}

export default config;
