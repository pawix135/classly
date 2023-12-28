import { z } from 'zod';

export const CreateNewsSchema = z.object({
  classId: z.string().min(1),
  content: z.string().min(1).max(500),
  title: z.string().min(1).max(50),
});
