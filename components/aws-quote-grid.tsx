"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";

type AwsQuoteGridProps = {
  quotes: string[];
};

export function AwsQuoteGrid({ quotes }: AwsQuoteGridProps): ReactElement {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(grid);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={gridRef}
      className={`aws-quote-grid ${isVisible ? "is-visible" : ""}`}
    >
      {quotes.map((quote) => (
        <blockquote key={quote}>
          <span>{quote}</span>
        </blockquote>
      ))}
    </div>
  );
}
