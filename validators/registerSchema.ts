import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type RegisterSchema = z.infer<typeof registerSchema>;
export default registerSchema;
