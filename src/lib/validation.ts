import { z } from "zod";
export const reserved = [
  "admin",
  "api",
  "auth",
  "about",
  "dashboard",
  "explore",
  "signin",
  "signup",
  "settings",
  "silong",
  "support",
  "help",
  "www",
  "profile",
  "u",
  "terms",
  "privacy",
  "community-guidelines",
];
export const profileSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(24)
    .regex(
      /^[a-z][a-z0-9_]*$/,
      "Use lowercase letters, numbers and underscores; start with a letter.",
    )
    .refine((x) => !reserved.includes(x), "This handle is reserved."),
  pen_name: z.string().trim().min(1).max(80),
  bio: z.string().trim().max(500),
});
