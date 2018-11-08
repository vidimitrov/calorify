import { omit, map } from 'lodash';
import Base, { BaseType } from '../base/Base';
import { MEALS_TABLE } from '../../../db/constants';

const OMIT_PROPS = [];
const PROPS = [
  'id',
  'user_id',
  'text',
  'number_of_calories',
  'date',
  'time',
  'deleted',
  'created_at',
  'updated_at',
];

export interface MealType extends BaseType {
  user_id: string;
  text: string;
  number_of_calories: number;
  date: string;
  time: string;
  deleted: boolean;
}

export interface MealModel {
  find: (criteria: any, opts?: any) => Promise<MealType>;
  findById: (id: string) => Promise<MealType>;
  findAll: (criteria: any, opts?: any) => Promise<MealType[]>;
  create: (user: MealType) => Promise<MealType>;
  update: (criteria: any, attrs: any) => Promise<MealType>;
  remove: (criteria: any) => Promise<MealType>;
}

export const schema = {
  isValid: (type, attrs) => {
    switch (type) {
      case 'create': {
        return attrs.text && attrs.number_of_calories && attrs.user_id;
      }
      case 'update': {
        return attrs.text || attrs.number_of_calories;
      }
    }
  },
};

export default (function Meal(): MealModel {
  return {
    find: async (criteria: any, opts?: any): Promise<MealType> => {
      const user = await <Promise<MealType>>Base.find(MEALS_TABLE, criteria);
      return user ? omit(user, opts ? opts.omit : OMIT_PROPS) : null;
    },
    findById: async (id: string): Promise<MealType> => {
      const user = await <Promise<MealType>>Base.findById(MEALS_TABLE, id);
      return user ? omit(user, OMIT_PROPS) : null;
    },
    findAll: async (criteria: any, opts?: any): Promise<MealType[]> => {
      const users = await <Promise<MealType[]>>Base.findAll(MEALS_TABLE, criteria, opts);
      return map(users, user => omit(user, OMIT_PROPS));
    },
    create: async (user: MealType): Promise<MealType> => {
      const [response] =
        await <Promise<MealType[]>>Base.create(MEALS_TABLE, user, { returning: PROPS });
      return response;
    },
    update: async (criteria: any, attrs: any): Promise<MealType> => {
      const response = await <Promise<MealType>>Base.update(MEALS_TABLE, criteria, attrs);
      return response;
    },
    remove: async (criteria: any): Promise<MealType> => {
      const response = await <Promise<MealType>>Base.remove(MEALS_TABLE, criteria);
      return response;
    },
  };
})();
