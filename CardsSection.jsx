import React, { useEffect, useMemo, useState } from 'react';
import Card from './Cards';

const PAGE_SIZE = 6;

function CardsSection({ posts = [], onRemove }) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(posts.length / PAGE_SIZE) - 1);
    if (page > maxPage) {
      setPage(maxPage);
    }
  }, [posts, page]);

  const pageCount = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));

  const visible = useMemo(() => {
    const start = page * PAGE_SIZE;
    return posts.slice(start, start + PAGE_SIZE);
  }, [posts, page]);

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(pageCount - 1, p + 1));

  return (
    <div>
      <section className="cards-section">
        <div className="cards-wrap">
          {visible.length === 0 ? (
            <div className="empty">No cards to display.</div>
          ) : (
            visible.map((post) => (
              <Card
                key={post.id}
                post={post}
                onRemove={() => onRemove(post.id)}
              />
            ))
          )}
        </div>

        {pageCount > 1 && ( 
          <div className="bottom-controls">
            <div className="pagination">
              <button
                className="nav-btn"
                onClick={handlePrev}
                disabled={page === 0}
                aria-label="previous"
              >
                ←
              </button>

              <div className="dots">
                {Array.from({ length: pageCount }).map((_, idx) => (
                  <button
                    key={idx}
                    className={`dot ${idx === page ? 'active' : ''}`}
                    onClick={() => setPage(idx)}
                    aria-label={`Go to page ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                className="nav-btn"
                onClick={handleNext}
                disabled={page === pageCount - 1}
                aria-label="next"
              >
                →
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default CardsSection;
