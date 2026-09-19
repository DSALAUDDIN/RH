import type { ReactNode } from 'react';

/**
 * Placeholder for content that is still pending from the clinic.
 *
 * Rendered in development only, so reviewers can see what is missing while
 * production output (and anything crawlers index) never contains it.
 */
export default function EditorialNote({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === 'production') return null;
  return <>{children}</>;
}
