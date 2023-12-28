import slugify from 'slugify';
import { v4 } from 'uuid';

export const createAssignmentSlug = (assignment_name: string) => {
  return (
    slugify(assignment_name, { lower: true, replacement: '-', strict: true, trim: true }) +
    `-${v4()}`
  );
};

export const createNewsSlug = (news_title: string): string => {
  return (
    slugify(news_title, { lower: true, replacement: '-', strict: true, trim: true }) + `-${v4()}`
  );
};
