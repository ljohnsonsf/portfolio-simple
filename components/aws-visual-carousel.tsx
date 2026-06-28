"use client";

import { useState, type ReactElement } from "react";
import Image from "next/image";

type AwsVisualCarouselSlide = {
  caption: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  placeholderLabel: string;
};

type AwsVisualCarouselProps = {
  slides: AwsVisualCarouselSlide[];
};

export function AwsVisualCarousel({
  slides,
}: AwsVisualCarouselProps): ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  function goToPrevious() {
    setActiveIndex((index) => (index === 0 ? slides.length - 1 : index - 1));
  }

  function goToNext() {
    setActiveIndex((index) => (index + 1) % slides.length);
  }

  return (
    <div className="aws-visual-carousel">
      <figure className="case-study-image-block aws-visual-carousel__figure">
        <figcaption>{activeSlide.caption}</figcaption>
        {activeSlide.image ? (
          <div className="case-study-image-frame">
            <Image
              src={activeSlide.image.src}
              alt={activeSlide.image.alt}
              width={activeSlide.image.width}
              height={activeSlide.image.height}
            />
          </div>
        ) : (
          <div
            className="case-study-image-placeholder"
            aria-label={activeSlide.placeholderLabel}
          />
        )}
      </figure>

      <div className="aws-visual-carousel__controls">
        <button
          type="button"
          className="aws-visual-carousel__button"
          onClick={goToPrevious}
          aria-label="Show previous visual reference"
        >
          ←
        </button>
        <p aria-live="polite">
          {activeIndex + 1} / {slides.length}
        </p>
        <button
          type="button"
          className="aws-visual-carousel__button"
          onClick={goToNext}
          aria-label="Show next visual reference"
        >
          →
        </button>
      </div>
    </div>
  );
}
