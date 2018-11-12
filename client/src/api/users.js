import cfg from '../../config';

const { API_URL } = cfg;

export const parseUser = user => ({
  id: user.id,
  role: user.role,
  name: user.name,
  email: user.email,
  dailyCaloriesLimit: user.daily_calories_limit,
  deleted: user.deleted,
  createdAt: user.created_at,
  updatedAt: user.updated_at,
});

export const create = async (token, userData) => {
  const response = await fetch(`${API_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      attrs: userData,
    }),
  });
  const data = await response.json();

  if (data.success) {
    const user = parseUser(data.user);
    return Promise.resolve({ user });
  }

  return Promise.reject(data);
};

export const list = async (token) => {
  const response = await fetch(`${API_URL}/api/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (data.success) {
    const users = data.users.map(user => (parseUser(user)));
    return Promise.resolve({ users });
  }

  return Promise.reject(data);
};

export const update = async (token, userId, updates) => {
  const response = await fetch(`${API_URL}/api/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      attrs: {
        name: updates.name,
        daily_calories_limit: updates.dailyCalories,
      },
    }),
  });
  const data = await response.json();

  if (data.success) {
    const user = parseUser(data.user);
    return Promise.resolve({ user });
  }

  return Promise.reject(data, userId);
};

export const remove = async (token, userId) => {
  const response = await fetch(`${API_URL}/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (data.success) {
    const user = parseUser(data.user);
    return Promise.resolve({ user });
  }

  return Promise.reject(data);
};
