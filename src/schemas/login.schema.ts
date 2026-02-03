import * as zod from "zod"

export const loginSchema = zod.object({
  username: zod
    .string()
    .min(1, 'Username is required'),
  password: zod
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = zod.infer<typeof loginSchema>;
