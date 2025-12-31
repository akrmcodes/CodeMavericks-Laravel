import { z } from "zod";
import { ROLES } from "@/lib/constants";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email("Enter a valid email"),
  password: z.string().min(1, { message: "Password is required" }),
  remember: z.boolean().default(false).optional(),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().min(1, { message: "Email is required" }).email("Enter a valid email"),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    password_confirmation: z.string().min(1, { message: "Please confirm your password" }),
    phone: z.string().optional(),
    role: z.enum(ROLES, {
      message: "Please select a valid role",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"],
  });

export const donationSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(255, { message: "Title is too long" }),
  description: z.string().optional(),
  quantity_kg: z.number().min(0.1, { message: "Minimum 0.1 kg" }).max(1000, { message: "Maximum 1000 kg" }),
  latitude: z.number().min(-90, { message: "Invalid latitude" }).max(90, { message: "Invalid latitude" }),
  longitude: z.number().min(-180, { message: "Invalid longitude" }).max(180, { message: "Invalid longitude" }),
  expires_at: z.string().optional(),
});

export const pickupCodeSchema = z.object({
  pickup_code: z.string().min(1, { message: "Pickup code is required" }).length(6, {
    message: "Pickup code must be 6 digits",
  }),
});

export const deliverySchema = z.object({
  notes: z.string().max(500, { message: "Notes too long" }).optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type DonationSchema = z.infer<typeof donationSchema>;
export type PickupCodeSchema = z.infer<typeof pickupCodeSchema>;
export type DeliverySchema = z.infer<typeof deliverySchema>;