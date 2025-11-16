import axios from 'axios';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage (only in browser)
    let token = null;
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      token = localStorage.getItem('authToken');
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request details
    console.log("📤 [Axios] Request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      fullUrl: `${config.baseURL}${config.url}`,
      params: config.params,
      headers: config.headers,
      hasToken: !!token,
    });
    
    return config;
  },
  (error) => {
    console.error("❌ [Axios] Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("📥 [Axios] Response:", {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      dataLength: JSON.stringify(response.data).length,
    });
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      console.error("❌ [Axios] Response error:", {
        status,
        statusText: error.response.statusText,
        url: error.config?.url,
        data,
      });
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden:', data.message);
          break;
        case 404:
          // Not found
          console.error('Resource not found:', data.message);
          break;
        case 500:
          // Server error
          console.error('Server error:', data.message);
          break;
        default:
          console.error('API error:', data.message);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('❌ [Axios] Network error: No response from server', {
        request: error.request,
        config: error.config,
      });
    } else {
      // Something else happened
      console.error('❌ [Axios] Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
