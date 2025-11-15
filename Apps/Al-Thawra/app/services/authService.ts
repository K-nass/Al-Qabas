import axiosInstance from '../lib/axios';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordData {
  token: string;
  userId: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

class AuthService {
  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
    
    // Save token to localStorage
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  }

  // Register
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
    
    // Save token to localStorage
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  }

  // Logout
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  // Get current user from localStorage
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Forgot password - send reset link
  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await axiosInstance.post<{ message: string }>('/auth/forgot-password', { email });
    return response.data;
  }

  // Reset password
  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    const response = await axiosInstance.post<{ message: string }>('/auth/reset-password', data);
    return response.data;
  }
}

export default new AuthService();
