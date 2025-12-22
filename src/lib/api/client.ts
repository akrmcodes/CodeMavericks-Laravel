import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiError } from "@/types/api";
import { AUTH_TOKEN_KEY } from "@/lib/constants";

const getBaseUrl = (): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not defined. Check your environment configuration."
    );
  }
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
};

const client: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        config.headers?.set("Authorization", `Bearer ${token}`);
      }
    }

    config.headers?.set("Content-Type", "application/json");
    config.headers?.set("Accept", "application/json");

    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiError>) => {
    const status = error.response?.status;

    // 401 Unauthorized - Clear token and redirect to login
    if (status === 401 && typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // 422 Validation Error - Normalize to ApiError
    if (status === 422) {
      const apiError: ApiError = {
        message: error.response?.data?.message ?? "Validation failed",
        errors: error.response?.data?.errors,
        status,
      };
      return Promise.reject(apiError);
    }

    // 403 Forbidden - Normalize to ApiError
    if (status === 403) {
      const apiError: ApiError = {
        message:
          error.response?.data?.message ?? "You do not have permission to perform this action",
        status,
      };
      return Promise.reject(apiError);
    }

    // 404 Not Found - Normalize to ApiError
    if (status === 404) {
      const apiError: ApiError = {
        message: error.response?.data?.message ?? "Resource not found",
        status,
      };
      return Promise.reject(apiError);
    }

    // 409 Conflict - Normalize to ApiError (used for already claimed donations)
    if (status === 409) {
      const apiError: ApiError = {
        message: error.response?.data?.message ?? "Conflict occurred",
        status,
      };
      return Promise.reject(apiError);
    }

    // 5xx Server Errors - Log and normalize
    if (typeof status === "number" && status >= 500) {
      console.error("[API Server Error]", {
        status,
        url: error.config?.url,
        data: error.response?.data,
      });
      const apiError: ApiError = {
        message: "An unexpected server error occurred. Please try again later.",
        status,
      };
      return Promise.reject(apiError);
    }

    // Network errors or other issues
    if (error.code === "ECONNABORTED" || !error.response) {
      const apiError: ApiError = {
        message: "Network error. Please check your connection and try again.",
        status: 0,
      };
      return Promise.reject(apiError);
    }

    return Promise.reject(error);
  }
);

export { client };