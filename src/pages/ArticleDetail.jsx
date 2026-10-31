
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  UserRound,
  BookOpen,
  Share2,
  Copy,
  Check,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import articles from "../data/articles";
import authors from "../data/authors";

function getSlug(article) {
  return (
    article.slug ||
    (article.title || "article")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

function getAuthorName(article) {
  return article.author?.name || article.author || "Daniel Carter";
}

function getArticleImage(article) {
  return (
    article.image ||
    article.imageUrl ||
    article.coverImage ||
    ""
  );
}

function getContentBlocks(article) {
  const content =
    article.content ||
    article.body ||
    article.description ||
    article.excerpt ||
    "More information about this topic will be available soon.";

  if (Array.isArray(content)) {
    return content
      .map((item, index) => {
        if (typeof item === "string") {
          return {
            type: "paragraph",
            text: item,
            id: `paragraph-${index}`,
          };
        }

        if (!item) return null;

        const heading = item.heading || item.title;
        const text = item.text || item.content || "";

        if (heading) {
          return {
            type: "section",
            heading,
            text,
            id: `section-${index}`,
          };
        }

        return text
          ? {
              type: "paragraph",
              text,
              id: `paragraph-${index}`,
            }
          : null;
      })
      .filter(Boolean);
  }

  return String(content)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      if (line.startsWith("## ")) {
        return {
          type: "heading",
          heading: line.replace(/^##\s*/, ""),
          id: `heading-${index}`,
        };
      }

      return {
        type: "paragraph",
        text: line,
        id: `paragraph-${index}`,
      };
    });
}

/* AUTHOR INFORMATION */
function AuthorInformation({ author, authorName }) {
  const [copied, setCopied] = useState(false);

  const name = author?.name || authorName || "Daniel Carter";

  const image =
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=85";

  const profileSlug = "daniel-carter";

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: `Read this article by ${name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Unable to share article:", error);
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="article-writer-section">
      <span className="article-writer-label">
        ABOUT THE WRITER
      </span>

      <div className="article-writer-card">
        <div className="article-writer-image">
          <img src={image} alt={name} />
        </div>

        <div className="article-writer-details">
          <span className="article-author-label">
            ABOUT THE AUTHOR
          </span>

          <h3>{name}</h3>

          <p>Finance &amp; Business Writer</p>

          <Link
            to={`/authors/${profileSlug}`}
            className="article-author-profile-link"
          >
            View Author Profile
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <div className="article-writer-actions">
        <button type="button" onClick={handleShare}>
          <Share2 size={16} />
          Share Article
        </button>

        <button type="button" onClick={handleCopy}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Link Copied" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}

/* ARTICLE NOT FOUND */
function ArticleNotFound() {
  return (
    <>
      <Header />

      <main className="article-not-found">
        <div className="container">
          <span className="section-eyebrow">
            404 / STORY NOT FOUND
          </span>

          <h1>This story is unavailable.</h1>

          <p>
            The article may have been moved or is no longer available.
          </p>

          <Link to="/blog" className="article-back-link">
            <ArrowLeft size={17} />
            Back to Articles
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}

/* ARTICLE BODY */
function ArticleBody({ article }) {
  const blocks = getContentBlocks(article);

  return (
    <div className="article-body">
      {blocks.map((block) => {
        if (
          block.type === "heading" ||
          block.type === "section"
        ) {
          return (
            <section
              className="article-content-section"
              id={block.id}
              key={block.id}
            >
              <h2>{block.heading}</h2>

              {block.text && <p>{block.text}</p>}
            </section>
          );
        }

        return <p key={block.id}>{block.text}</p>;
      })}
    </div>
  );
}

/* MAIN ARTICLE PAGE */
export default function ArticleDetail() {
  const { slug } = useParams();

  const article = articles.find(
    (item) => getSlug(item) === slug
  );

  if (!article) {
    return <ArticleNotFound />;
  }

  const image = getArticleImage(article);
  const authorName = getAuthorName(article);

  const matchedAuthor = authors.find(
    (item) =>
      item.name?.toLowerCase() ===
      String(authorName).toLowerCase()
  );

  const date =
    article.date ||
    article.publishedAt ||
    article.createdAt;

  const readTime = article.readTime || "5 min read";

  const relatedArticles = articles
    .filter((item) => getSlug(item) !== getSlug(article))
    .sort((a, b) => {
      const aMatch =
        a.category === article.category ? 1 : 0;

      const bMatch =
        b.category === article.category ? 1 : 0;

      return bMatch - aMatch;
    })
    .slice(0, 3);

  return (
    <>
      <Header />

      <main className="article-detail-page article-clean-page">
        {/* TITLE */}
        <section className="article-clean-intro">
          <div className="container">
            <Link to="/blog" className="article-back-link">
              <ArrowLeft size={17} />
              Back to Articles
            </Link>

            <div className="article-clean-heading">
              <span className="section-eyebrow">
                {article.category || "WEIRDWEALTH"}
              </span>

              <h1>{article.title}</h1>

              <p className="article-excerpt">
                {article.excerpt || article.description || ""}
              </p>

              <div className="article-meta">
                <span>
                  <UserRound size={16} />
                  {authorName}
                </span>

                {date && (
                  <span>
                    <CalendarDays size={16} />
                    {date}
                  </span>
                )}

                <span>
                  <Clock3 size={16} />
                  {readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED ARTICLE IMAGE */}
        <section className="article-clean-cover">
          {image ? (
            <img
              src={image}
              alt={article.title}
              fetchPriority="high"
            />
          ) : (
            <div className="article-cover-placeholder">
              <BookOpen size={45} />
              <span>WEIRDWEALTH EDITORIAL</span>
            </div>
          )}
        </section>

        {/* ARTICLE DETAILS */}
        <section className="article-main-content">
          <div className="container">
            <div className="article-layout">
              <article className="article-reading-area">
                <div className="article-content-heading">
                  <span className="section-eyebrow">
                    THE STORY
                  </span>

                  <h2>Article Overview</h2>
                </div>

                <ArticleBody article={article} />

                {/* AUTHOR SECTION WITH SHARE AND COPY BUTTONS */}
                <AuthorInformation
                  author={matchedAuthor}
                  authorName={authorName}
                />

                <div className="article-end-note">
                  <span>WEIRDWEALTH</span>

                  <p>
                    Modern Wealth. Modern Thinking.
                  </p>
                </div>

                <Link to="/blog" className="article-back-link">
                  <ArrowLeft size={17} />
                  Explore More Articles
                </Link>
              </article>

              {/* RELATED STORIES */}
              <aside className="article-sidebar">
                <div className="article-sidebar-card">
                  <span className="section-eyebrow">
                    KEEP EXPLORING
                  </span>

                  <h3>More Ideas For You.</h3>

                  <div className="related-articles-list">
                    {relatedArticles.map((item) => (
                      <Link
                        to={`/blog/${getSlug(item)}`}
                        className="related-article-item"
                        key={item.id || item.slug}
                      >
                        <span>
                          {item.category || "Insights"}
                        </span>

                        <h4>{item.title}</h4>

                        <ArrowUpRight size={17} />
                      </Link>
                    ))}
                  </div>

                  <Link
                    to="/blog"
                    className="article-sidebar-link"
                  >
                    View All Articles
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
