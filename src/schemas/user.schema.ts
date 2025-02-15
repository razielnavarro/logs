import { z } from 'zod';

export const userSchema = z.object({
    email: z.string().email(),
    full_name: z.string(),
    rnb: z.string(),
    sucursal_code: z.string(),
    is_premium: z.boolean(),
});