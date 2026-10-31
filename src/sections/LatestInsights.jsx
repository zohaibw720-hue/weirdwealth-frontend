
import { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock3,
} from "lucide-react";
import { Link } from "react-router-dom";

import { articles } from "../data/articles";

export default function LatestInsights() {
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const card = slider.querySelector(".insight-card");

    if (!card) return;

    const styles = window.getComputedStyle(slider);
    const gap =
      parseFloat(styles.columnGap || styles.gap) || 28;

    const distance = card.getBoundingClientRect().width + gap;

    slider.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="latest-insights-section"
      aria-labelledby="insights-title"
    >
      <div className="container">
        <div className="insights-header">
          <div className="insights-heading">
            <span className="section-eyebrow">
              <span className="eyebrow-line" />
              KNOWLEDGE THAT MOVES YOU
            </span>

            <h2 id="insights-title">
              Latest <span>Insights.</span>
            </h2>

            <p>
              Fresh perspectives, practical knowledge, and ideas
              to help you make smarter moves.
            </p>
          </div>

          <div className="insights-actions">
            <button
              type="button"
              className="insight-slider-button"
              onClick={() => scrollSlider(-1)}
              aria-label="Previous articles"
            >
              <ArrowLeft size={19} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="insight-slider-button"
              onClick={() => scrollSlider(1)}
              aria-label="Next articles"
            >
              <ArrowRight size={19} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="insights-grid"
          ref={sliderRef}
          aria-label="Latest articles"
        >
          {articles.map((article) => (
            <article className="insight-card" key={article.id}>
              <Link
                to={`/blog/${article.slug}`}
                className="insight-image"
                aria-label={`Read ${article.title}`}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  decoding="async"
                />

                <span className="insight-image-arrow">
                  <ArrowUpRight size={20} aria-hidden="true" />
                </span>
              </Link>

              <div className="insight-content">
                <div className="insight-meta-top">
                  <span className="insight-category">
                    {article.category}
                  </span>

                  <span className="insight-date">
                    {article.date}
                  </span>
                </div>

                <h3>
                  <Link to={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p>{article.excerpt}</p>

                <div className="insight-card-footer">
                  <span>
                    <Clock3 size={15} aria-hidden="true" />
                    {article.readTime}
                  </span>

                  <Link
                    to={`/blog/${article.slug}`}
                    aria-label={`Read ${article.title}`}
                  >
                    Read Story
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="insights-bottom">
          <span>01 — {String(articles.length).padStart(2, "0")}</span>

          <span className="insights-bottom-line" />

          <Link to="/blog" className="insights-view-all">
            Explore All Insights
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
