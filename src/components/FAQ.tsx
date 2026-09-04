// src/components/FAQ.tsx
//
// Answer-first FAQ. The answer's first sentence is the answer — no throat
// clearing, no "it depends", no "at RH Dental Care we believe". This is the
// shape an AI answer engine can lift verbatim and attribute.
//
// Renders as native <details>, so every answer is in the initial HTML and is
// readable with JavaScript disabled. It also emits FAQPage JSON-LD on the page
// whose visible content actually answers the questions — never site-wide, which
// is what the old root layout did on all 24 routes.

import { faqSchema, buildGraph, type FaqItem } from '@/lib/schema';
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
  if (!items.length) return null;

  return (
    <section className="rh-faq rh-section" id={id} aria-labelledby={`${id}-title`}>
      {emitSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildGraph([faqSchema(items)])).replace(/</g, '\\u003c'),
          }}
        />
      )}

      <div className="rh-container">
        <h2 id={`${id}-title`} className="rh-faq-title">
          {title}
        </h2>

        <div className="rh-faq-list">
          {items.map((item, i) => (
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
