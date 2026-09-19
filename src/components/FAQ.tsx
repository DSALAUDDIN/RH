// Answer-first FAQ rendered with native <details>, so answers are present in
// the initial HTML. Emits FAQPage JSON-LD scoped to the page that renders it.

import {
  buildGraph,
  faqSchema,
  publishedFaq,
  serializeJsonLd,
  type FaqItem,
} from '@/lib/seo/schema';
import './FAQ.css';

export type { FaqItem };

export default function FAQ({
  items,
  title = 'Questions patients ask',
  emitSchema = true,
  id = 'faq',
}: {
  items: FaqItem[];
  title?: string;
  emitSchema?: boolean;
  id?: string;
}) {
  const published = publishedFaq(items);
  if (!published.length) return null;

  return (
    <section className="rh-faq rh-section" id={id} aria-labelledby={`${id}-title`}>
      {emitSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(buildGraph([faqSchema(published)])),
          }}
        />
      )}

      <div className="rh-container">
        <h2 id={`${id}-title`} className="rh-faq-title">
          {title}
        </h2>

        <div className="rh-faq-list">
          {published.map((item, i) => (
            <details key={i} className="rh-faq-item" name={id}>
              <summary className="rh-faq-q">
                <span>{item.q}</span>
                <span className="rh-faq-mark" aria-hidden="true" />
              </summary>
              <div className="rh-faq-a">
                {item.a.split('\n\n').map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
