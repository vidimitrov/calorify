// Get config for ENV
export const ENV = process.env.NODE_ENV || 'development';
const cfg = require(`./env/${ENV}`);

// Server configuration
export const HOST = process.env.HOST || cfg['HOST'] || 'localhost';
export const PORT = process.env.PORT || cfg['PORT'] || 3000;
export const API_SECRET = process.env.API_SECRET || cfg['API_SECRET'];
