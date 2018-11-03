import bcrypt from 'bcrypt';
import { omit, map } from 'lodash';
import Base, { BaseType } from '../base/Base';
import { USERS_TABLE } from '../../../db/constants';

const SALT_ROUNDS = 10;
const OMIT_PROPS = ['password', 'provider'];
const PROPS = [
  'id',
  'name',
  'email',
  'role',
  'deleted',
  'daily_calories_limit',
  'created_at',
  'updated_at',
];

export interface UserType extends BaseType {
  organization_id: string;
  password: string;
  provider: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  deleted: boolean;
}

export interface UserModel {
  find: (criteria: any, opts?: any) => Promise<UserType>;
  findById: (id: string) => Promise<UserType>;
  findAll: (criteria: any, opts?: any) => Promise<UserType[]>;
  create: (user: UserType) => Promise<UserType>;
  update: (criteria: any, attrs: any) => Promise<UserType>;
  remove: (criteria: any) => Promise<UserType>;
}

export const verifyPassword = async (user: UserType, password: string): Promise<boolean> => {
  let result;
  try {
    result = await bcrypt.compare(password, user.password);
  } catch (err) {
    return err;
  }
  return result;
};

export const generatePassword = async (password): Promise<string> => {
  let result;
  try {
    result = await bcrypt.hash(password, SALT_ROUNDS);
  } catch (err) {
    return err;
  }
  return result;
};

export default (function User(): UserModel {
  return {
    find: async (criteria: any, opts?: any): Promise<UserType> => {
      const user = await <Promise<UserType>>Base.find(USERS_TABLE, criteria);
      return user ? omit(user, opts ? opts.omit : OMIT_PROPS) : null;
    },
    findById: async (id: string): Promise<UserType> => {
      const user = await <Promise<UserType>>Base.findById(USERS_TABLE, id);
      return user ? omit(user, OMIT_PROPS) : null;
    },
    findAll: async (criteria: any, opts?: any): Promise<UserType[]> => {
      const users = await <Promise<UserType[]>>Base.findAll(USERS_TABLE, criteria, opts);
      return map(users, user => omit(user, OMIT_PROPS));
    },
    create: async (user: UserType): Promise<UserType> => {
      user.password = await generatePassword(user.password);
      const [response] =
        await <Promise<UserType[]>>Base.create(USERS_TABLE, user, { returning: PROPS });
      return response;
    },
    update: async (criteria: any, attrs: any): Promise<UserType> => {
      const response = await <Promise<UserType>>Base.update(USERS_TABLE, criteria, attrs);
      return response;
    },
    remove: async (criteria: any): Promise<UserType> => {
      const response = await <Promise<UserType>>Base.remove(USERS_TABLE, criteria);
      return response;
    },
  };
})();
