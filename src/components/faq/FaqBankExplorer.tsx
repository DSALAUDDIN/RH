'use client';

import { useMemo, useState } from 'react';
import type { FaqCategory } from '@/data/faqBank';
import './FaqBankExplorer.css';

interface FaqBankExplorerProps {
  categories: FaqCategory[];
}

export default function FaqBankExplorer({ categories }: FaqBankExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const totalFaqsCount = useMemo(
    () => categories.reduce((sum, c) => sum + c.faqs.length, 0),
    [categories],
  );

  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return categories
      .filter((cat) => selectedCategory === 'all' || cat.id === selectedCategory)
      .map((cat) => {
        if (!query) return cat;
        const matchingFaqs = cat.faqs.filter(
          (faq) =>
            faq.q.toLowerCase().includes(query) ||
            faq.a.toLowerCase().includes(query) ||
            cat.title.toLowerCase().includes(query),
        );
        return {
          ...cat,
          faqs: matchingFaqs,
        };
      })
      .filter((cat) => cat.faqs.length > 0);
  }, [categories, selectedCategory, searchQuery]);

  const totalMatchingFaqs = useMemo(
    () => filteredCategories.reduce((sum, c) => sum + c.faqs.length, 0),
    [filteredCategories],
  );

  return (
    <div className="rh-faq-bank">
      {/* Search and Filter Controls */}
      <div className="rh-faq-bank-controls">
        <div className="rh-faq-search-box">
          <label htmlFor="faq-search-input" className="sr-only">
            Search patient dental FAQ bank
          </label>
          <div className="rh-faq-search-input-wrap">
            <svg
              className="rh-faq-search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              id="faq-search-input"
              type="search"
              placeholder="Search by symptom, procedure or question (e.g., implant, root canal, aligners, price)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rh-faq-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="rh-faq-search-clear"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Pill Filters */}
        <div
          className="rh-faq-categories-scroll"
          role="tablist"
          aria-label="Filter FAQ by specialty"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
            className={`rh-faq-cat-pill ${selectedCategory === 'all' ? 'is-active' : ''}`}
          >
            All Specialties ({totalFaqsCount})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rh-faq-cat-pill ${selectedCategory === cat.id ? 'is-active' : ''}`}
            >
              <span className="rh-faq-cat-num">{String(cat.id).padStart(2, '0')}</span>
              <span>{cat.title}</span>
              <span className="rh-faq-cat-badge">{cat.faqs.length}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Status Bar */}
      <div className="rh-faq-status-bar" aria-live="polite">
        {searchQuery ? (
          <p>
            Showing <strong>{totalMatchingFaqs}</strong> questions matching &ldquo;{searchQuery}
            &rdquo;
            {selectedCategory !== 'all' && (
              <span> in {categories.find((c) => c.id === selectedCategory)?.title}</span>
            )}
            .
          </p>
        ) : selectedCategory !== 'all' ? (
          <p>
            Category: <strong>{categories.find((c) => c.id === selectedCategory)?.title}</strong> (
            {totalMatchingFaqs} questions)
          </p>
        ) : (
          <p>
            Showing all <strong>120 verified patient questions</strong> across 15 dental
            specialties.
          </p>
        )}
      </div>

      {/* Categorized FAQ Sections */}
      {filteredCategories.length === 0 ? (
        <div className="rh-faq-no-results">
          <p>No questions matched your search query &ldquo;{searchQuery}&rdquo;.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="rh-btn-outline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="rh-faq-sections-list">
          {filteredCategories.map((cat) => (
            <section
              key={cat.id}
              id={cat.slug}
              className="rh-faq-category-card"
              aria-labelledby={`cat-title-${cat.id}`}
            >
              <div className="rh-faq-category-header">
                <div className="rh-faq-category-meta">
                  <span className="rh-faq-category-num">
                    SPECIALTY {String(cat.id).padStart(2, '0')}
                  </span>
                  <h2 id={`cat-title-${cat.id}`} className="rh-faq-category-title">
                    {cat.title}
                  </h2>
                </div>
                <span className="rh-faq-category-count-badge">
                  {cat.faqs.length} {cat.faqs.length === 1 ? 'Question' : 'Questions'}
                </span>
              </div>

              <div className="rh-faq-items-wrapper">
                {cat.faqs.map((faq, idx) => (
                  <details
                    key={`${cat.id}-${idx}`}
                    className="rh-faq-bank-item"
                    name={`faq-group-${cat.id}`}
                  >
                    <summary className="rh-faq-bank-q">
                      <span className="rh-faq-bank-q-text">{faq.q}</span>
                      <span className="rh-faq-bank-mark" aria-hidden="true" />
                    </summary>
                    <div className="rh-faq-bank-a">
                      {faq.a.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
