
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock3 } from "lucide-react";

export default function ArticleCard({
  article = {},
  variant = "default",
  className = "",
}) {
  const {
    id,
    slug,
    title = "Discover a Smarter Way to Build Wealth",
    excerpt = "Explore practical ideas, modern strategies and insights for a more intentional financial future.",
    image,
    category = "Smart Living",
    author = "WeirdWealth Editorial",
    readTime = "5 min read",
    date,
  } = article;

  const articlePath = slug
    ? `/blog/${slug}`
    : id
      ? `/blog/${id}`
      : "/blog";

  return (
    <article
      className={`article-card article-card-${variant} ${className}`.trim()}
    >
      <Link
        to={articlePath}
        className="article-card-image-link"
        aria-label={`Read ${title}`}
      >
        <div className="article-card-image">
          {image ? (
            <img src={image} alt={title} loading="lazy" />
          ) : (
            <div className="article-image-placeholder">
              <span>WEIRDWEALTH</span>
            </div>
          )}

          <span className="article-category">{category}</span>

          <span className="article-image-arrow">
            <ArrowUpRight size={20} aria-hidden="true" />
          </span>
        </div>
      </Link>

      <div className="article-card-content">
        {date && <span className="article-date">{date}</span>}

        <h3 className="article-card-title">
          <Link to={articlePath}>{title}</Link>
        </h3>

        <p className="article-card-excerpt">{excerpt}</p>

        <div className="article-card-footer">
          <span className="article-author">{author}</span>

          <span className="article-read-time">
            <Clock3 size={14} aria-hidden="true" />
            {readTime}
          </span>
        </div>
      </div>
    </article>
  );
}
