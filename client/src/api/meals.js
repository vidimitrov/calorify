import cfg from '../../config';

const { API_URL } = cfg;

const parseMeal = meal => ({
  id: meal.id,
  name: meal.text,
  calories: meal.number_of_calories,
  userId: meal.user_id,
  date: meal.date,
  time: meal.time,
  deleted: meal.deleted,
  createdAt: meal.created_at,
  updatedAt: meal.updated_at,
});

export const create = async (token, mealData) => {
  const response = await fetch(`${API_URL}/api/meals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      attrs: {
        text: mealData.name,
        number_of_calories: mealData.calories,
        date: mealData.date,
        time: mealData.time,
      },
    }),
  });
  const data = await response.json();

  if (data.success) {
    const meal = parseMeal(data.meal);
    return Promise.resolve({ meal });
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
    const meals = data.meals.map(meal => (parseMeal(meal)));
    return Promise.resolve({ meals });
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
        date: updates.date,
        time: updates.time,
      },
    }),
  });
  const data = await response.json();

  if (data.success) {
    const meal = parseMeal(data.meal);
    return Promise.resolve({ meal });
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
    const meal = parseMeal(data.meal);
    return Promise.resolve({ meal });
  }

  return Promise.reject(data);
};
