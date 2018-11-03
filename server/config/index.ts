// Get config for ENV
export const ENV = process.env.NODE_ENV || 'development';
const cfg = require(`./env/${ENV}`);

// Server configuration
export const HOST = process.env.HOST || cfg['HOST'] || 'localhost';
export const PORT = process.env.PORT || cfg['PORT'] || 3000;
export const API_SECRET = process.env.API_SECRET || cfg['API_SECRET'];

// PostgreSQL
export const PG_URI =
  process.env.PG_URI || cfg['PG_URI'];

export const PG_POOL_MIN =
  process.env.PG_POOL_MIN || cfg['PG_POOL_MIN'] || 0;

export const PG_POOL_MAX =
  process.env.PG_POOL_MAX || cfg['PG_POOL_MAX'] || 2;
