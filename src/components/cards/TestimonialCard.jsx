
import { Star, Quote } from "lucide-react";

export default function TestimonialCard({
  testimonial = {},
  className = "",
}) {
  if (!testimonial) return null;

  const {
    name = "WeirdWealth Reader",
    role = "Community Member",
    quote = "Discover smarter perspectives on money, personal growth and modern living.",
    image,
    rating = 5,
    initials,
  } = testimonial;

  const safeRating = Math.min(5, Math.max(0, Number(rating) || 0));

  return (
    <article className={`testimonial-card ${className}`.trim()}>
      <div className="testimonial-card-top">
        <Quote
          className="testimonial-quote-icon"
          size={32}
          strokeWidth={1.5}
          aria-hidden="true"
        />

        <div
          className="testimonial-rating"
          aria-label={`${safeRating} out of 5 stars`}
        >
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={15}
              fill={index < safeRating ? "currentColor" : "none"}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <blockquote className="testimonial-quote">
        “{quote}”
      </blockquote>

      <div className="testimonial-person">
        <div className="testimonial-avatar" aria-hidden="true">
          {image ? (
            <img src={image} alt="" loading="lazy" decoding="async" />
          ) : (
            <span>
              {initials || name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div>
          <h3>{name}</h3>
          <span>{role}</span>
        </div>
      </div>
    </article>
  );
}
