// Barrel export for all API services
export { apiClient } from './client';
export { postsApi } from './posts.api';
export { usersApi } from './users.api';
export { rolesApi } from './roles.api';
export { categoriesApi } from './categories.api';
export type { Role, RolesResponse, GetRolesParams, CreateRoleDto, UpdateRoleDto } from './roles.api';
export type { User, UsersResponse, GetUsersParams } from './users.api';
export type { Category, GetCategoriesParams } from './categories.api';
