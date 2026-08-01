import { requestClient } from '#/api/request';

export interface SystemUser {
  id: string;
  username: string;
  realName: string;
  email: null | string;
  isActive: boolean;
  roles: string[];
  lastLoginAt: null | string;
  createdAt: string;
}

export interface UserListParams {
  page: number;
  pageSize: number;
  keyword?: string;
}

export interface UserListResult {
  items: SystemUser[];
  total: number;
  page: number;
  pageSize: number;
}

export interface RoleOption {
  code: string;
  name: string;
}

export interface CreateUserParams {
  username: string;
  password: string;
  realName: string;
  email?: string;
  roleCodes: string[];
}

export interface UpdateUserParams {
  realName: string;
  email?: string;
  roleCodes: string[];
}

export interface UpdateUserStatusResult {
  id: string;
  username: string;
  isActive: boolean;
}

export function getUserListApi() {
  return requestClient.get<SystemUser[]>('/users');
}

export function getUserPageApi(params: UserListParams) {
  return requestClient.get<UserListResult>('/users/page', {
    params,
  });
}

export function getRoleOptionsApi() {
  return requestClient.get<RoleOption[]>('/roles/options');
}

export function createUserApi(data: CreateUserParams) {
  return requestClient.post<SystemUser>('/users', data);
}

export function updateUserApi(userId: string, data: UpdateUserParams) {
  return requestClient.put<SystemUser>(`/users/${userId}`, data);
}

export function updateUserStatusApi(userId: string, isActive: boolean) {
  return requestClient.request<UpdateUserStatusResult>(
    `/users/${userId}/status`,
    {
      method: 'PATCH',
      data: {
        isActive,
      },
    },
  );
}
