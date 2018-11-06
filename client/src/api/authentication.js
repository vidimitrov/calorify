import cfg from '../../config';

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

  return data;
};

export const signup = async (name, email, password) => {
  const attrs = {
    name,
    email,
    password,
  };

  if (role) attrs.role = role;

  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ attrs }),
  });

  const data = response.json();

  return data;
};

export const logout = async () => {
  const response = await fetch(`${API_URL}/api/auth/logout`);
  const data = await response.json();

  return data;
};
