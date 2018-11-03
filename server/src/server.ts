import http from 'http';
import app from './app';
import {
  PORT,
} from '../config';

// Create the http server
const server = http.createServer(app.callback());

server.listen(
  PORT,
  () => console.log(`Calorify API started on port ${PORT}`),
);

export { server };
