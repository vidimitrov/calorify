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
        daily_calories_limit: updates.dailyCaloriesLimit,
      },
    }),
  });
  const data = await response.json();

  if (data.success) {
    const user = parseUser(data.user);
    return Promise.resolve({ user });
  }

  return Promise.reject(data);
};
