import { z } from 'zod';

export const postCreateSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().optional(),
});

export const postPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
});
