export const AUTH_TOKEN_KEY = "zerohunger_auth_token";

// Tuple assertion ensures Zod enum receives a readonly tuple
export const ROLES = ["donor", "volunteer", "recipient"] as const;
