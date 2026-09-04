// src/components/JsonLd.tsx
//
// The only component that writes structured data to the page, apart from <FAQ>,
// which emits its own FAQPage beside the questions it renders.
//
// Before this, the branch entities were declared in three places with
// conflicting coordinates, addresses and opening hours, and /banasree emitted a
// second Dentist node reusing the root node's @id (docs/audit-report.md P1-5).
// All of it now comes from src/lib/schema.ts, which reads src/lib/branches.ts.
//
// No aggregateRating is ever emitted from here. See src/lib/reviews.ts.

import { buildGraph, siteGraph } from '@/lib/schema';

export default function JsonLd({
  nodes,
  site = false,
}: {
  /** Page-specific nodes: branch, physician, procedure, breadcrumb. */
  nodes?: Record<string, unknown>[];
  /** Render the site-wide base graph. True on the root layout only. */
  site?: boolean;
}) {
  const graph = [...(site ? siteGraph() : []), ...(nodes ?? [])];
  if (!graph.length) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildGraph(graph)).replace(/</g, '\\u003c'),
      }}
    />
  );
}
