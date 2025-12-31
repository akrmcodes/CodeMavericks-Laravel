export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  latitude: number | null;
  longitude: number | null;
  impact_score?: number;
  status?: string;
  roles: string[];
  permissions?: string[];
  created_at?: string;
  updated_at?: string;
}
