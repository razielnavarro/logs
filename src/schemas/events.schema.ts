import { z } from 'zod';

export const eventsSchema = z.object({
    event_name: z.string(),
    module: z.string(),
    data: z.string(),
    userId: z.string().uuid(),
});