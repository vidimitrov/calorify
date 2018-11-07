import cfg from '../../config';

const { API_URL } = cfg;

export const update = async (token, userId, updates) => {
  const response = await fetch(`${API_URL}/api/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      attrs: updates,
    }),
  });
  const data = await response.json();

  if (data.success) {
    return Promise.resolve(data);
  }

  return Promise.reject(data);
};
