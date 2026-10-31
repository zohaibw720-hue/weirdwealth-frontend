
import { useState } from "react";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

import { articles } from "../data/articles";

export default function FeaturedArticle() {
  const featuredArticle = articles[0];
  const [imageError, setImageError] = useState(false);

  if (!featuredArticle) return null;

  const {
    slug,
    title,
    excerpt,
    image,
    category,
    author,
    readTime,
  } = featuredArticle;

  const articlePath = `/blog/${slug}`;

  return (
    <section
      className="featured-section"
      aria-labelledby="featured-title"
    >
      <div className="container">
        <div className="featured-top">
          <span className="section-eyebrow">
            <span className="eyebrow-line" />
            EDITOR'S PICK
          </span>

          <span className="featured-edition">
            FEATURED STORY — 01
          </span>
        </div>

        <div className="featured-card">
          <div className="featured-image">
            {!imageError && image ? (
              <img
                src={image}
                alt={title}
                loading="lazy"
                decoding="async"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="featured-image-placeholder">
                <span>WEIRDWEALTH</span>
              </div>
            )}

            <span className="featured-image-label">
              THE FUTURE OF WEALTH
            </span>
          </div>

          <div className="featured-content">
            <span className="featured-category">
              {category}
            </span>

            <h2 id="featured-title">{title}</h2>

            <p className="featured-description">
              {excerpt}
            </p>

            <div className="featured-meta">
              <span>
                <Clock3 size={16} aria-hidden="true" />
                {readTime}
              </span>

              <span>{author}</span>
            </div>

            <Link
              to={articlePath}
              className="featured-button"
              aria-label={`Read featured story: ${title}`}
            >
              Read Featured Story
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
