
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
  List,
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
  return (
    article.author?.name ||
    article.author ||
    "WeirdWealth Editorial Team"
  );
}

function getArticleImage(article) {
  return article.image || article.imageUrl || article.coverImage || "";
}

function getHeadingId(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getContentBlocks(article) {
  const content =
    article.content ||
    article.body ||
    article.description ||
    article.excerpt ||
    "More insights and practical information about this topic will be available soon.";

  if (Array.isArray(content)) {
    return content
      .map((item, index) => {
        if (typeof item === "string") {
          return {
            type: "paragraph",
            text: item,
            id: `article-paragraph-${index}`,
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
            id: getHeadingId(heading),
          };
        }

        return text
          ? {
              type: "paragraph",
              text,
              id: `article-paragraph-${index}`,
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
        const heading = line.replace(/^##\s*/, "");

        return {
          type: "heading",
          heading,
          id: getHeadingId(heading) || `section-${index}`,
        };
      }

      return {
        type: "paragraph",
        text: line,
        id: `article-paragraph-${index}`,
      };
    });
}

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
            Explore our latest insights to discover another story.
          </p>

          <Link to="/blog" className="primary-button">
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}

function ArticleContent({ article }) {
  const blocks = getContentBlocks(article);

  return (
    <div className="article-body" id="article-content">
      {blocks.map((block) => {
        if (block.type === "heading" || block.type === "section") {
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

function AuthorCard({ author, fallbackName }) {
  if (!author) {
    return (
      <div className="article-author-card" id="article-author">
        <div className="article-author-avatar article-author-fallback">
          <UserRound size={28} />
        </div>

        <div className="article-author-info">
          <span className="section-eyebrow">WRITTEN BY</span>
          <h3>{fallbackName}</h3>
          <p>WeirdWealth Editorial Team</p>
        </div>
      </div>
    );
  }

  return (
    <div className="article-author-card" id="article-author">
      <img
        src={author.image}
        alt={author.name}
        className="article-author-avatar"
        loading="lazy"
      />

      <div className="article-author-info">
        <span className="section-eyebrow">ABOUT THE AUTHOR</span>

        <h3>
          <Link to={`/authors/${author.slug}`}>
            {author.name}
          </Link>
        </h3>

        <p>{author.role}</p>

        <Link
          to={`/authors/${author.slug}`}
          className="article-author-profile-link"
        >
          View Author Profile
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </div>
  );
}

function ShareArticle({ title }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareData = {
      title,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      window.prompt("Copy this article link:", window.location.href);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      window.prompt("Copy this article link:", window.location.href);
    }
  }

  return (
    <div className="article-share-actions">
      <button type="button" onClick={handleShare}>
        <Share2 size={16} />
        Share Article
      </button>

      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy article link"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "Copied" : "Copy Link"}
      </button>
    </div>
  );
}

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
      item.name.toLowerCase() ===
      String(authorName).toLowerCase()
  );

  const date =
    article.date ||
    article.publishedAt ||
    article.createdAt;

  const readTime = article.readTime || "5 min read";

  const contentBlocks = getContentBlocks(article);

  const contentHeadings = contentBlocks.filter(
    (block) =>
      block.type === "heading" ||
      block.type === "section"
  );

  const relatedArticles = articles
    .filter((item) => getSlug(item) !== getSlug(article))
    .sort((a, b) => {
      const aMatch = a.category === article.category ? 1 : 0;
      const bMatch = b.category === article.category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  const heroImage =
    image ||
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85";

  return (
    <>
      <Header />

      <main className="article-detail-page">
        {/* ARTICLE HERO */}
        <section className="article-detail-header article-image-hero">
          <div
            className="article-hero-background"
            style={{ backgroundImage: `url("${heroImage}")` }}
            aria-hidden="true"
          />
          <div className="article-hero-overlay" aria-hidden="true" />

          <div className="container article-hero-container">
            <Link to="/blog" className="article-back-link">
              <ArrowLeft size={17} />
              Back to Insights
            </Link>

            <div className="article-heading">
              <span className="section-eyebrow">
                {article.category || "WEIRDWEALTH INSIGHTS"}
              </span>

              <h1>{article.title}</h1>

              <p className="article-excerpt">
                {article.excerpt ||
                  article.description ||
                  "Discover fresh perspectives and practical ideas from WeirdWealth."}
              </p>

              <div className="article-meta">
                <span>
                  <UserRound size={16} />

                  {matchedAuthor ? (
                    <Link to={`/authors/${matchedAuthor.slug}`}>
                      {matchedAuthor.name}
                    </Link>
                  ) : (
                    authorName
                  )}
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

              <ShareArticle title={article.title} />
            </div>
          </div>

          <div className="article-hero-bottom">
            <span>WEIRDWEALTH / EDITORIAL</span>
            <span>IDEAS WORTH EXPLORING</span>
          </div>
        </section>

        {/* ARTICLE COVER */}
        <section className="article-cover-section">
          <div className="container">
            {image ? (
              <div className="article-cover-image">
                <img
                  src={image}
                  alt={article.title}
                  fetchPriority="high"
                />
              </div>
            ) : (
              <div className="article-cover-placeholder">
                <BookOpen size={48} />
                <span>WEIRDWEALTH EDITORIAL</span>
              </div>
            )}
          </div>
        </section>

        {/* ARTICLE CONTENT */}
        <section className="article-main-content section-padding">
          <div className="container">
            <div className="article-layout">
              <article className="article-reading-area">
                <nav
                  className="article-table-of-contents"
                  aria-label="Article contents"
                >
                  <div className="article-toc-heading">
                    <List size={19} />
                    <h2>In This Article</h2>
                  </div>

                  <a href="#article-content">
                    Article Overview
                  </a>

                  {contentHeadings.map((heading) => (
                    <a
                      href={`#${heading.id}`}
                      key={heading.id}
                    >
                      {heading.heading}
                    </a>
                  ))}

                  <a href="#article-author">
                    About the Author
                  </a>

                  <a href="#related-stories">
                    Related Stories
                  </a>
                </nav>

                <ArticleContent article={article} />

                <div className="article-end-note">
                  <span>WEIRDWEALTH</span>
                  <p>
                    Ideas worth exploring. Knowledge worth sharing.
                  </p>
                </div>

                <div className="article-bottom-share">
                  <span>Found this article useful?</span>
                  <ShareArticle title={article.title} />
                </div>

                <AuthorCard
                  author={matchedAuthor}
                  fallbackName={authorName}
                />

                <Link to="/blog" className="article-back-link">
                  <ArrowLeft size={17} />
                  Explore More Articles
                </Link>
              </article>

              <aside className="article-sidebar">
                <div className="article-sidebar-card">
                  <span className="section-eyebrow">
                    KEEP EXPLORING
                  </span>

                  <h3>More ideas for you.</h3>

                  {relatedArticles.length > 0 ? (
                    <div
                      className="related-articles-list"
                      id="related-stories"
                    >
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
                  ) : (
                    <p>
                      More stories will be available soon.
                    </p>
                  )}

                  <Link
                    to="/blog"
                    className="article-sidebar-link"
                  >
                    View All Articles
                    <ArrowUpRight size={16} />
                  </Link>
                </div>

                {matchedAuthor && (
                  <div className="article-sidebar-author">
                    <img
                      src={matchedAuthor.image}
                      alt={matchedAuthor.name}
                      loading="lazy"
                    />

                    <span>ABOUT THE WRITER</span>
                    <h3>{matchedAuthor.name}</h3>
                    <p>{matchedAuthor.role}</p>

                    <Link to={`/authors/${matchedAuthor.slug}`}>
                      Meet the Author
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
