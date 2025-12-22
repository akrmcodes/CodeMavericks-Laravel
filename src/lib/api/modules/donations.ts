import { client } from "@/lib/api/client";
import { ApiResponse, User } from "@/types/api";

export interface Donation {
  id: number;
  title: string;
  description: string | null;
  quantity_kg: number;
  status: "available" | "reserved" | "picked_up" | "delivered" | "expired" | "cancelled";
  pickup_code:  string | null;
  latitude: number;
  longitude: number;
  expires_at: string | null;
  is_expired: boolean;
  is_available: boolean;
  distance?:  number;
  donor: Pick<User, "id" | "name" | "email" | "phone">;
  claim?:  Claim | null;
  created_at: string;
  updated_at: string;
}

export interface Claim {
  id:  number;
  donation_id: number;
  volunteer_id: number;
  status: "active" | "picked_up" | "delivered" | "cancelled";
  picked_up_at:  string | null;
  delivered_at:  string | null;
  notes: string | null;
  volunteer?:  Pick<User, "id" | "name" | "phone">;
  created_at: string;
  updated_at: string;
}

export interface CreateDonationRequest {
  title:  string;
  description?:  string;
  quantity_kg: number;
  latitude: number;
  longitude: number;
  expires_at?:  string;
}

export interface ClaimDonationResponse {
  message: string;
  donation: Donation;
  pickup_code:  string;
}

export const donations = {
  async list(): Promise<ApiResponse<Donation[]>> {
    const response = await client.get<Donation[]>("/donations");
    return {
      data: response.data,
      message: "OK",
      status: response.status,
    };
  },

  async get(id: number): Promise<ApiResponse<Donation>> {
    const response = await client.get<Donation>(`/donations/${id}`);
    return {
      data: response.data,
      message:  "OK",
      status: response.status,
    };
  },

  async create(payload: CreateDonationRequest): Promise<ApiResponse<Donation>> {
    const response = await client.post<Donation>("/donations", payload);
    return {
      data: response.data,
      message:  "Donation created successfully",
      status:  response.status,
    };
  },

  async claim(id: number): Promise<ApiResponse<ClaimDonationResponse>> {
    const response = await client.post<ClaimDonationResponse>(`/donations/${id}/claim`);
    return {
      data:  response.data,
      message: response.data.message,
      status: response.status,
    };
  },

  async myDonations(): Promise<ApiResponse<Donation[]>> {
    const response = await client.get<Donation[]>("/my-donations");
    return {
      data: response.data,
      message: "OK",
      status: response.status,
    };
  },

  async nearby(
    latitude: number,
    longitude: number,
    radius: number = 10
  ): Promise<ApiResponse<Donation[]>> {
    const response = await client.get<Donation[]>("/donations/nearby", {
      params: { latitude, longitude, radius },
    });
    return {
      data: response.data,
      message:  "OK",
      status: response.status,
    };
  },
};