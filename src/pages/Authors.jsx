
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Users,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { authors } from "../data/authors";

export default function Authors() {
  return (
    <>
      <Header />

      <main className="authors-directory">
        <section className="authors-hero authors-image-hero">
          <div className="authors-hero-background" aria-hidden="true" />
          <div className="authors-hero-overlay" aria-hidden="true" />

          <div className="authors-hero-inner">
            <span className="authors-eyebrow">
              <Users size={15} />
              THE PEOPLE BEHIND THE IDEAS
            </span>

            <h1>
              Meet the minds
              <br />
              <span>shaping tomorrow.</span>
            </h1>

            <p>
              Meet the voices sharing fresh perspectives on money,
              digital skills, and modern living.
            </p>

            <div className="authors-hero-bottom">
              <span>OUR CONTRIBUTORS</span>
              <span>
                {authors.length.toString().padStart(2, "0")} AUTHORS
              </span>
            </div>
          </div>
        </section>

        <section className="authors-content">
          <div className="authors-section-heading">
            <div>
              <span className="authors-section-label">
                THE EDITORIAL TEAM
              </span>
              <h2>Our contributors</h2>
            </div>

            <p>
              Fresh perspectives. Useful knowledge.
              <br />
              Ideas worth putting into action.
            </p>
          </div>

          <div className="authors-grid">
            {authors.map((author, index) => (
              <article
                className="author-directory-card"
                key={author.id || author.slug}
              >
                <Link
                  to={`/authors/${author.slug}`}
                  className="author-directory-image-link"
                  aria-label={`View ${author.name}'s profile`}
                >
                  <div className="author-directory-image-wrap">
                    {author.image ? (
                      <img
                        src={author.image}
                        alt={author.name}
                        className="author-directory-image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="author-directory-image-fallback">
                        {author.name?.charAt(0) || "A"}
                      </div>
                    )}

                    <span className="author-directory-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="author-directory-arrow">
                      <ArrowUpRight size={21} />
                    </span>
                  </div>
                </Link>

                <div className="author-directory-info">
                  <span className="author-directory-role">
                    {author.role || "Contributor"}
                  </span>

                  <h3>
                    <Link to={`/authors/${author.slug}`}>
                      {author.name}
                    </Link>
                  </h3>

                  <p>{author.bio}</p>

                  <div className="author-directory-footer">
                    <span>
                      <BookOpen size={15} />
                      {author.articles?.length || 0} ARTICLES
                    </span>

                    <Link
                      to={`/authors/${author.slug}`}
                      className="author-profile-link"
                    >
                      VIEW PROFILE
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="authors-back-link">
            <Link to="/blog">
              <ArrowLeft size={16} />
              EXPLORE ALL ARTICLES
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
