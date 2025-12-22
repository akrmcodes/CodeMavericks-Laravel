import { client } from "@/lib/api/client";
import { ApiResponse, User } from "@/types/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  role: "donor" | "volunteer" | "recipient";
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
  token: string;
}

export interface LogoutResponse {
  message: string;
}

export interface MeResponse {
  user: User;
}

export const auth = {
  async login(payload: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await client.post<LoginResponse>("/login", payload);
    return {
      data: response.data,
      message: response.data.message,
      status: response.status,
    };
  },

  async register(payload: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    const response = await client.post<RegisterResponse>("/register", payload);
    return {
      data: response.data,
      message: response.data.message,
      status: response.status,
    };
  },

  async logout(): Promise<ApiResponse<LogoutResponse>> {
    const response = await client.post<LogoutResponse>("/logout");
    return {
      data: response.data,
      message: response.data.message,
      status: response.status,
    };
  },

  async me(): Promise<ApiResponse<MeResponse>> {
    const response = await client.get<MeResponse>("/me");
    return {
      data: response.data,
      message: "OK",
      status: response.status,
    };
  },
};
