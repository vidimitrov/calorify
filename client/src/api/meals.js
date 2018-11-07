import cfg from '../../config';

const { API_URL } = cfg;

export const create = async (token, meal) => {
  const response = await fetch(`${API_URL}/api/meals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      attrs: {
        text: meal.name,
        number_of_calories: meal.calories,
      },
    }),
  });
  const data = await response.json();

  if (data.success) {
    return Promise.resolve(data);
  }

  return Promise.reject(data);
};

export const list = async (token) => {
  const response = await fetch(`${API_URL}/api/meals`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (data.success) {
    return Promise.resolve(data);
  }

  return Promise.reject(data);
};

export const update = async (token, mealId, updates) => {
  const response = await fetch(`${API_URL}/api/meals/${mealId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      attrs: {
        text: updates.name,
        number_of_calories: updates.calories,
      },
    }),
  });
  const data = await response.json();

  if (data.success) {
    return Promise.resolve(data);
  }

  return Promise.reject(data);
};

export const remove = async (token, mealId) => {
  const response = await fetch(`${API_URL}/api/meals/${mealId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (data.success) {
    return Promise.resolve(data);
  }

  return Promise.reject(data);
};
