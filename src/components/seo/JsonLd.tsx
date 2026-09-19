import { buildGraph, serializeJsonLd, siteGraph, type JsonLdNode } from '@/lib/seo/schema';

interface JsonLdProps {
  /** Page-level nodes: breadcrumb, physician, procedure, article, etc. */
  nodes?: JsonLdNode[];
  /** Include the site-wide graph. Set only by the root layout. */
  site?: boolean;
}

/** Renders schema.org JSON-LD as a single `@graph` document. */
export default function JsonLd({ nodes = [], site = false }: JsonLdProps) {
  const graph = [...(site ? siteGraph() : []), ...nodes];
  if (graph.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildGraph(graph)) }}
    />
  );
}
