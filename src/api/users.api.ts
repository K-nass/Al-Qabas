import { apiClient } from './client';

// Types
export interface User {
  id: string;
  userName: string;
  email: string;
  avatarImageUrl: string | null;
  isActive: boolean;
  emailConfirmed: boolean;
  createdAt: string;
  role: string;
}

export interface UsersResponse {
  pageSize: number;
  pageNumber: number;
  totalCount: number;
  totalPages: number;
  itemsFrom: number;
  itemsTo: number;
  items: User[];
}

export interface GetUsersParams {
  Role?: string;
  Status?: string;
  EmailConfirmed?: boolean;
  PageNumber?: number;
  PageSize?: number;
  SearchPhrase?: string;
}

export const usersApi = {
  // Get all users with pagination and filters
  getAll: async (params?: GetUsersParams) => {
    const response = await apiClient.get<UsersResponse>('/users/all', { params });
    return response.data;
  },

  // Get single user by ID
  getById: async (id: string) => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },
};
