import devCfg from './env/development';
import prodCfg from './env/production';

const ENV = process.env.NODE_ENV;
const config = ENV === 'development' ? devCfg : prodCfg;

export default config;
