import { API_URL } from '../../config';

export const login = (email, password) => {
  const attrs = {
    email,
    password,
  };

  return fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attrs)
  });
};

export const signup = (name, email, password) => {
  const attrs = {
    name,
    email,
    password,
  };

  if (role) attrs.role = role;

  return fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ attrs })
  });
};

export const logout = (email, password) => {
  return fetch(`${API_URL}/api/auth/logout`);
};
