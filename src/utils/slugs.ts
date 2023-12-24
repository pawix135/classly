import slugify from "slugify";
import { v4 } from "uuid";

export const createAssignmentSlug = (assignment_name: string) => {
  return slugify(assignment_name, { lower: true, replacement: "-", strict: true, trim: true }) + `-${v4()}`;
};
