import { USERS_TABLE } from '../constants';
export const seed = (knex, promise) => {
  return promise.all([
    knex(USERS_TABLE).insert([
      {
        id: '05c69639-a594-48a2-96f4-8b7a34850e4d',
        password: '$2b$10$eXgsyjp5N95tyZJvSjT83O1ZKXy08iamB1J5wdNC.dtJMwTETn136',
        name: 'John Doe',
        email: 'john@email.com',
        role: 'user',
      },
    ]),
  ]);
};
