import { client } from "@/lib/api/client";
import { ApiResponse } from "@/types/api";
import { Claim, Donation } from "./donations";

export interface ClaimWithDonation extends Claim {
  donation: Donation;
}

export interface PickupRequest {
  pickup_code: string;
}

export interface DeliverRequest {
  notes?: string;
}

export interface ClaimActionResponse {
  message:  string;
  claim:  Claim;
}

export const claims = {
  async list(): Promise<ApiResponse<ClaimWithDonation[]>> {
    const response = await client.get<ClaimWithDonation[]>("/claims");
    return {
      data: response.data,
      message:  "OK",
      status: response.status,
    };
  },

  async markPickedUp(
    id: number,
    payload: PickupRequest
  ): Promise<ApiResponse<ClaimActionResponse>> {
    const response = await client.post<ClaimActionResponse>(
      `/claims/${id}/pickup`,
      payload
    );
    return {
      data:  response.data,
      message: response. data.message,
      status: response. status,
    };
  },

  async markDelivered(
    id:  number,
    payload: DeliverRequest = {}
  ): Promise<ApiResponse<ClaimActionResponse>> {
    const response = await client.post<ClaimActionResponse>(
      `/claims/${id}/deliver`,
      payload
    );
    return {
      data: response.data,
      message: response.data.message,
      status: response.status,
    };
  },

  async cancel(id: number): Promise<ApiResponse<{ message: string }>> {
    const response = await client.delete<{ message: string }>(`/claims/${id}`);
    return {
      data: response.data,
      message: response.data.message,
      status: response.status,
    };
  },
};