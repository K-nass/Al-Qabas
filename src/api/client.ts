import axios from 'axios';

// Token storage: 
// - Auth token in memory (cleared on page refresh for security)
// - Refresh token in sessionStorage (survives page refresh, cleared when tab closes)
let authToken: string | null = null;

const REFRESH_TOKEN_KEY = 'refresh_token';

// Token management functions
export function setAuthToken(token: string | null) {
  authToken = token;
}

export function getAuthToken(): string | null {
  return authToken;
}

export function setRefreshToken(token: string | null) {
  if (token) {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  } else {
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}

export function getRefreshToken(): string | null {
  return sessionStorage.getItem(REFRESH_TOKEN_KEY);
}

export function clearAuthToken() {
  authToken = null;
}

export function clearRefreshToken() {
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function clearAllTokens() {
  authToken = null;
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if exists (from in-memory storage)
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't redirect on 401 - let components handle it
    // This allows form submissions to display validation errors
    // instead of redirecting to login
    return Promise.reject(error);
  }
);
