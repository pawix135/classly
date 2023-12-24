import { z } from "zod";

export const CreateAssignmentSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(500),
  teacherId: z.string(),
  classId: z.string(),
});
