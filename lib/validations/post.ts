import { z } from 'zod';

export const postCreateSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().optional(),
});
