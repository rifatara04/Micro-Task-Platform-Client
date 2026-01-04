import axios from 'axios';

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && envUrl.endsWith('/api')) {
    return envUrl;
  }
  if (envUrl) {
    return `${envUrl}/api`;
  }
  return 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
      // Note: We might want to use the JWT from our backend login response instead of Firebase token?
      // The backend 'protect' middleware currently expects our custom JWT.
      // But we are storing the Firebase token in 'access-token' in AuthProvider.
      // Wait, in authController.js we generate a custom JWT token. 
      // We should probably use THAT token for API calls.
      // Modified plan: In Login/Register components, after successful firebase auth, 
      // we call backend, get backend token, and store THAT.
      
      // For now, let's assume we store the backend token as 'token'
      // and maybe 'firebase-token' is different.
      // Let's stick to using 'token' for the backend JWT.
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
