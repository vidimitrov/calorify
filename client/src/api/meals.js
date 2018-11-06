import cfg from '../../config';

const { API_URL } = cfg;

export const create = async (meal) => {
  const response = await fetch(`${API_URL}/api/meals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      attrs: meal,
    }),
  });
  const data = await response.json();

  if (data.success) {
    return Promise.resolve(data);
  }

  return Promise.reject(data);
};

export const list = async () => {
  const response = await fetch(`${API_URL}/api/meals`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (data.success) {
    return Promise.resolve(data);
  }

  return Promise.reject(data);
};

export const update = async (mealId, updates) => {
  const response = await fetch(`${API_URL}/api/meals/${mealId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
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

export const remove = async (mealId) => {
  const response = await fetch(`${API_URL}/api/meals/${mealId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (data.success) {
    return Promise.resolve(data);
  }

  return Promise.reject(data);
};
