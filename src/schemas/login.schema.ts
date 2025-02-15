import { z } from 'zod';

export const loginSchema = z.object({
    user_id: z.string(),
    success: z.boolean(),
    country: z.string(),
    user_agent: z.string(),
});