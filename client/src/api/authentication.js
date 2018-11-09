import jwt from 'jsonwebtoken';
import cfg from '../../config';
import { parseUser } from './users';

const { API_URL } = cfg;

export const login = async (email, password) => {
  const attrs = {
    email,
    password,
  };

  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(attrs),
  });
  const data = await response.json();

  if (data.success) {
    return Promise.resolve({
      token: data.token,
      user: parseUser(jwt.decode(data.token)),
    });
  }

  return Promise.reject(data);
};

export const signup = async (name, email, password) => {
  const attrs = {
    name,
    email,
    password,
  };

  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ attrs }),
  });

  const data = await response.json();

  if (data.success) {
    return Promise.resolve(data);
  }

  return Promise.reject(data);
};

export const logout = async () => {
  const response = await fetch(`${API_URL}/api/auth/logout`);
  const data = await response.json();

  if (data.success) {
    return Promise.resolve(data);
  }

  return Promise.reject(data);
};
