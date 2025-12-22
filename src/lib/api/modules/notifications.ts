import { client } from "@/lib/api/client";
import { ApiResponse } from "@/types/api";

export interface Notification {
  id: string;
  type: string;
  data: {
    donation_id?: number;
    donation_title?: string;
    volunteer_name?: string;
    pickup_code?: string;
    message:  string;
  };
  read_at:  string | null;
  created_at: string;
}

export interface NotificationsListResponse {
  notifications: Notification[];
}

export interface MarkReadResponse {
  message: string;
}

export const notifications = {
  async list(): Promise<ApiResponse<Notification[]>> {
    const response = await client.get<Notification[]>("/notifications");
    return {
      data: response.data,
      message: "OK",
      status:  response.status,
    };
  },

  async markRead(id: string): Promise<ApiResponse<MarkReadResponse>> {
    const response = await client. post<MarkReadResponse>(`/notifications/${id}/read`);
    return {
      data: response.data,
      message: response.data.message,
      status: response.status,
    };
  },

  async markAllRead(): Promise<ApiResponse<MarkReadResponse>> {
    const response = await client.post<MarkReadResponse>("/notifications/read-all");
    return {
      data:  response.data,
      message: response.data.message,
      status: response.status,
    };
  },
};