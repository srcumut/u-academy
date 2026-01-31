import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Lesson Service
export const lessonService = {
  getMyLessons: async () => {
    const response = await api.get('/lessons');
    return response.data;
  },
  getLessonById: async (id: number) => {
    const response = await api.get(`/lessons/${id}`);
    return response.data;
  }
};

export default api;
