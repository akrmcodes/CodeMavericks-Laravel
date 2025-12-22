import { client } from "@/lib/api/client";
import { ApiResponse, User } from "@/types/api";

export interface UpdateProfileResponse {
  message: string;
  user: User;
}

export const profile = {
  async update(data: Partial<User>): Promise<ApiResponse<UpdateProfileResponse>> {
    const response = await client.put<UpdateProfileResponse>("/profile", data);
    return {
      data: response.data,
      message: response.data.message,
      status: response.status,
    };
  },
};
