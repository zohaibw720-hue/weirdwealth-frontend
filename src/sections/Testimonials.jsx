
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import testimonials from "../data/testimonials";
import TestimonialCard from "../components/cards/TestimonialCard";

export default function Testimonials() {
  const sliderRef = useRef(null);

  const scrollTestimonials = (direction) => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const card = slider.querySelector(".testimonial-card");

    if (!card) return;

    const styles = window.getComputedStyle(slider);
    const gap = parseFloat(styles.columnGap || styles.gap) || 24;

    const distance = card.getBoundingClientRect().width + gap;

    slider.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  };

  if (!testimonials?.length) return null;

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="container">
        <div className="testimonials-header">
          <div>
            <span className="section-eyebrow">
              <span className="eyebrow-line" aria-hidden="true" />
              COMMUNITY VOICES
            </span>

            <h2 id="testimonials-title">
              Real People.
              <br />
              <span>Real Perspectives.</span>
            </h2>
          </div>

          <div className="testimonials-controls">
            <button
              type="button"
              className="testimonial-control"
              onClick={() => scrollTestimonials(-1)}
              aria-label="Previous testimonials"
            >
              <ArrowLeft size={19} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="testimonial-control"
              onClick={() => scrollTestimonials(1)}
              aria-label="Next testimonials"
            >
              <ArrowRight size={19} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="testimonials-grid"
          ref={sliderRef}
          aria-label="Community testimonials"
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>

        <div className="testimonials-bottom">
          <span>COMMUNITY FIRST</span>
          <span className="testimonials-bottom-line" />
          <span>GROW TOGETHER. MOVE FORWARD.</span>
        </div>
      </div>
    </section>
  );
}
