import { auth } from "@/lib/api/modules/auth";
import { profile } from "@/lib/api/modules/profile";
import { donations } from "@/lib/api/modules/donations";
import { claims } from "@/lib/api/modules/claims";
import { notifications } from "@/lib/api/modules/notifications";

export const api = {
  auth,
  profile,
  donations,
  claims,
  notifications,
};

export type ApiModules = typeof api;

// Re-export types for convenience
export type { LoginRequest, RegisterRequest } from "./modules/auth";
export type { Donation, Claim, CreateDonationRequest } from "./modules/donations";
export type { ClaimWithDonation, PickupRequest, DeliverRequest } from "./modules/claims";
export type { Notification } from "./modules/notifications";