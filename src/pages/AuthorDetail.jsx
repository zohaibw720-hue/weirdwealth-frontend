
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  UserRound,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import articles from "../data/articles";
import authors from "../data/authors";

export default function AuthorDetail() {
  const { slug } = useParams();

  const author = authors.find((item) => item.slug === slug);

  if (!author) {
    return (
      <>
        <Header />

        <main className="author-not-found">
          <div className="container">
            <span className="section-eyebrow">
              404 / AUTHOR NOT FOUND
            </span>

            <h1>Author unavailable.</h1>

            <p>
              This author profile may have been moved or is
              currently unavailable.
            </p>

            <Link to="/authors" className="primary-button">
              <ArrowLeft size={18} />
              Back to Authors
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const authorArticles = articles.filter((article) =>
    author.articles?.includes(article.slug)
  );

  return (
    <>
      <Header />

      <main className="author-detail-page">
        <section className="author-profile-hero">
          <div className="container">
            <Link to="/authors" className="article-back-link">
              <ArrowLeft size={17} />
              Back to Authors
            </Link>

            <div className="author-profile-layout">
              <div className="author-profile-image">
                {author.image ? (
                  <img
                    src={author.image}
                    alt={author.name}
                    fetchPriority="high"
                  />
                ) : (
                  <div className="author-profile-image-fallback">
                    <UserRound size={64} />
                  </div>
                )}
              </div>

              <div className="author-profile-content">
                <span className="section-eyebrow">
                  MEET OUR CONTRIBUTOR
                </span>

                <h1>{author.name}</h1>

                <h2>{author.role}</h2>

                <p>{author.bio}</p>

                <div className="author-profile-stats">
                  <div>
                    <strong>{authorArticles.length}</strong>
                    <span>Published Articles</span>
                  </div>

                  <div>
                    <strong>WEIRDWEALTH</strong>
                    <span>Editorial Contributor</span>
                  </div>
                </div>

                <div className="author-social-links">
                  {author.social?.linkedin &&
                    author.social.linkedin !== "#" && (
                      <a
                        href={author.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                        <ArrowUpRight size={15} />
                      </a>
                    )}

                  {author.social?.instagram &&
                    author.social.instagram !== "#" && (
                      <a
                        href={author.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Instagram
                        <ArrowUpRight size={15} />
                      </a>
                    )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="author-articles-section section-padding">
          <div className="container">
            <div className="author-articles-heading">
              <div>
                <span className="section-eyebrow">
                  THE AUTHOR'S WORK
                </span>

                <h2>
                  Stories by {author.name.split(" ")[0]}.
                </h2>

                <p>
                  Explore articles, insights and ideas written by{" "}
                  {author.name}.
                </p>
              </div>

              <span className="author-article-count">
                {authorArticles.length} ARTICLES
              </span>
            </div>

            {authorArticles.length > 0 ? (
              <div className="author-articles-grid">
                {authorArticles.map((article) => (
                  <article
                    className="author-article-card"
                    key={article.slug}
                  >
                    <Link
                      to={`/blog/${article.slug}`}
                      className="author-article-image"
                      aria-label={`Read ${article.title}`}
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                      />

                      <span>
                        <ArrowUpRight size={19} />
                      </span>
                    </Link>

                    <div className="author-article-content">
                      <span className="author-article-category">
                        {article.category}
                      </span>

                      <h3>
                        <Link to={`/blog/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>

                      <p>{article.excerpt}</p>

                      <div className="author-article-meta">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>

                      <Link
                        to={`/blog/${article.slug}`}
                        className="author-read-link"
                      >
                        Read Article
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="author-empty-state">
                <BookOpen size={38} />

                <h3>No articles published yet.</h3>

                <p>
                  New stories from this contributor will appear here.
                </p>

                <Link to="/blog" className="primary-button">
                  Explore All Articles
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
