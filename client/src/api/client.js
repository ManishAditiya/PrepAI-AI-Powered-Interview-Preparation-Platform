import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  refresh: () => apiClient.post('/auth/refresh'),
};

// Interview API calls
export const interviewAPI = {
  getAll: () => apiClient.get('/interview'),
  getById: (id) => apiClient.get(`/interview/${id}`),
  create: (data) => apiClient.post('/interview', data),
  update: (id, data) => apiClient.put(`/interview/${id}`, data),
  delete: (id) => apiClient.delete(`/interview/${id}`),
  submitAnswer: (id, data) => apiClient.post(`/interview/${id}/answer`, data),
};

// Resume API calls
export const resumeAPI = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getAll: () => apiClient.get('/resume'),
  getById: (id) => apiClient.get(`/resume/${id}`),
  delete: (id) => apiClient.delete(`/resume/${id}`),
  parse: (id) => apiClient.post(`/resume/parse`, { resumeId: id }),
};

// Feedback API calls
export const feedbackAPI = {
  getById: (id) => apiClient.get(`/feedback/${id}`),
  generate: (interviewId) => apiClient.post('/feedback/generate', { interviewId }),
};

// User API calls
export const userAPI = {
  getProfile: () => apiClient.get('/user/profile'),
  updateProfile: (data) => apiClient.put('/user/profile', data),
  getStats: () => apiClient.get('/user/stats'),
};

export default apiClient;
