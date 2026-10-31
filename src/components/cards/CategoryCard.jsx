
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  const [imageError, setImageError] = useState(false);

  if (!category) return null;

  const {
    id,
    title = "Explore Category",
    description = "Discover the latest insights and ideas.",
    image,
    path = "/categories",
    icon: Icon,
  } = category;

  const hasImage = Boolean(image) && !imageError;

  return (
    <Link
      to={path}
      className="category-card"
      aria-label={`Explore ${title}`}
    >
      <div className="category-card-image">
        {hasImage ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className="category-image-placeholder"
            aria-label={`${title} image unavailable`}
          >
            <span>WEIRDWEALTH</span>
          </div>
        )}

        <div
          className="category-card-image-overlay"
          aria-hidden="true"
        />

        {id !== undefined && id !== null && (
          <span className="category-number">
            {String(id).padStart(2, "0")}
          </span>
        )}

        {Icon && (
          <span className="category-icon" aria-hidden="true">
            <Icon size={20} strokeWidth={1.8} />
          </span>
        )}
      </div>

      <div className="category-card-content">
        <div className="category-card-heading">
          <h3>{title}</h3>

          <span className="category-arrow" aria-hidden="true">
            <ArrowUpRight size={19} />
          </span>
        </div>

        <p>{description}</p>

        <span className="category-explore">
          Explore category
          <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
