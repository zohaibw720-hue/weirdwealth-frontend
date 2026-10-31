
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowLeft,
  Wallet,
  Laptop,
  TrendingUp,
  Sparkles,
  Users,
  CalendarDays,
  Clock3,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { articles } from "../data/articles";

const ARTICLES_PER_PAGE = 6;

const categories = [
  {
    title: "Finance",
    slug: "finance",
    description:
      "Understand money, improve financial decisions and build a stronger financial future.",
    icon: Wallet,
    number: "01",
  },
  {
    title: "Digital Skills",
    slug: "digital-skills",
    description:
      "Discover valuable digital skills, technology and opportunities for the modern world.",
    icon: Laptop,
    number: "02",
  },
  {
    title: "Passive Income",
    slug: "passive-income",
    description:
      "Explore income opportunities, business ideas and smarter ways to build wealth.",
    icon: TrendingUp,
    number: "03",
  },
  {
    title: "Smart Living",
    slug: "smart-living",
    description:
      "Explore productivity, lifestyle improvements and ideas for better everyday living.",
    icon: Sparkles,
    number: "04",
  },
  {
    title: "Community",
    slug: "community",
    description:
      "Discover inspiring stories, experiences and ideas from a growing community.",
    icon: Users,
    number: "05",
  },
];

/* MAIN CATEGORIES DIRECTORY */
function CategoryDirectory() {
  return (
    <>
      <section className="inner-page-hero categories-main-hero">
        <div className="categories-main-hero-overlay" />

        <div className="container categories-main-hero-container">
          <div className="categories-main-hero-content">
            <span className="section-eyebrow">
              EXPLORE WEIRDWEALTH
            </span>

            <h1>
              Knowledge for
              <br />
              <span className="accent-text">Every Direction.</span>
            </h1>

            <p>
              Explore the topics, ideas and skills that can help
              you build a smarter and more independent future.
            </p>
          </div>
        </div>
      </section>

      <section className="categories-directory section-padding">
        <div className="container">
          <div className="blog-section-heading">
            <span className="section-eyebrow">
              OUR CATEGORIES
            </span>

            <h2>Find your next area of interest.</h2>
          </div>

          <div className="categories-directory-grid">
            {categories.map((category) => {
              const Icon = category.icon;

              const count = articles.filter(
                (article) =>
                  article.category?.toLowerCase() ===
                  category.title.toLowerCase()
              ).length;

              return (
                <article
                  className="directory-category-card"
                  key={category.slug}
                >
                  <div className="directory-category-top">
                    <span>{category.number}</span>

                    <div className="directory-category-icon">
                      <Icon size={25} />
                    </div>
                  </div>

                  <h3>{category.title}</h3>

                  <p>{category.description}</p>

                  <div className="directory-category-bottom">
                    <span>
                      <BookOpen size={14} />
                      {count} {count === 1 ? "STORY" : "STORIES"}
                    </span>

                    <Link
                      to={`/categories/${category.slug}`}
                      className="directory-category-link"
                      aria-label={`Explore ${category.title}`}
                    >
                      Explore
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-cta-section">
        <div className="container">
          <span className="section-eyebrow">
            KEEP DISCOVERING
          </span>

          <h2>There is always something new to learn.</h2>

          <Link to="/blog" className="primary-button">
            Explore Latest Insights
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}

/* INDIVIDUAL CATEGORY DETAIL */
function CategoryDetail({ category }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryArticles = articles.filter(
    (article) =>
      article.category?.toLowerCase() === category.title.toLowerCase()
  );

  const totalPages = Math.max(
    1,
    Math.ceil(categoryArticles.length / ARTICLES_PER_PAGE)
  );

  const requestedPage = Number(searchParams.get("page")) || 1;

  const currentPage = Math.min(
    Math.max(requestedPage, 1),
    totalPages
  );

  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;

  const visibleArticles = categoryArticles.slice(
    startIndex,
    startIndex + ARTICLES_PER_PAGE
  );

  const updatePage = (page) => {
    const nextParams = new URLSearchParams(searchParams);

    if (page <= 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(page));
    }

    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const Icon = category.icon;

  return (
    <div className="category-detail-page">
      <section
        className={`category-editorial-hero category-hero-${category.slug}`}
      >
        <div className="category-editorial-background" />
        <div className="category-editorial-glow" />

        <div className="container category-editorial-inner">
          <div className="category-editorial-topline">
            <Link
              to="/categories"
              className="category-editorial-back"
            >
              <ArrowLeft size={16} />
              ALL CATEGORIES
            </Link>

            <span>
              WEIRDWEALTH / {category.title.toUpperCase()}
            </span>
          </div>

          <div className="category-editorial-main">
            <div className="category-editorial-copy">
              <span className="category-editorial-eyebrow">
                <span />
                EXPLORE THE SUBJECT
              </span>

              <h1>
                {category.title}
                <span>.</span>
              </h1>

              <p>{category.description}</p>

              <div className="category-editorial-stats">
                <div>
                  <strong>
                    {String(categoryArticles.length).padStart(2, "0")}
                  </strong>
                  <span>ARTICLES</span>
                </div>

                <div>
                  <strong>
                    {String(totalPages).padStart(2, "0")}
                  </strong>
                  <span>PAGES</span>
                </div>
              </div>
            </div>

            <div className="category-editorial-icon">
              <Icon size={76} strokeWidth={1.1} />
              <span>{category.number}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="category-detail-content">
        <div className="category-detail-toolbar">
          <div>
            <span className="category-list-eyebrow">
              THE WEIRDWEALTH JOURNAL
            </span>

            <h2>Explore the latest stories.</h2>
          </div>

          <p>
            Showing{" "}
            <strong>
              {categoryArticles.length === 0 ? 0 : startIndex + 1}
              {"–"}
              {Math.min(
                startIndex + ARTICLES_PER_PAGE,
                categoryArticles.length
              )}
            </strong>{" "}
            of <strong>{categoryArticles.length}</strong> articles
          </p>
        </div>

        <div className="category-detail-articles">
          {visibleArticles.length > 0 ? (
            visibleArticles.map((article, index) => (
              <article
                className="category-detail-card"
                key={article.id || article.slug}
              >
                <Link
                  to={`/blog/${article.slug}`}
                  className="category-detail-card-image"
                  aria-label={`Read ${article.title}`}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                  />

                  <span className="category-card-number">
                    {String(startIndex + index + 1).padStart(2, "0")}
                  </span>

                  <span className="category-card-image-arrow">
                    <ArrowUpRight size={21} />
                  </span>
                </Link>

                <div className="category-detail-card-body">
                  <span className="category-detail-card-category">
                    {article.category}
                  </span>

                  <h3>
                    <Link
                      to={`/blog/${article.slug}`}
                      className="category-detail-title-link"
                    >
                      {article.title}
                    </Link>
                  </h3>

                  <p>{article.excerpt}</p>

                  <div className="category-detail-meta">
                    <span>
                      <CalendarDays size={14} />
                      {article.date}
                    </span>

                    <span>
                      <Clock3 size={14} />
                      {article.readTime}
                    </span>
                  </div>

                  <Link
                    to={`/blog/${article.slug}`}
                    className="category-detail-card-link"
                  >
                    Read Full Article
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="category-detail-empty">
              <div className="category-empty-icon">
                <BookOpen size={30} />
              </div>

              <h3>More stories are coming soon.</h3>

              <p>
                We are preparing new {category.title.toLowerCase()} articles.
                Explore other categories while you wait.
              </p>

              <Link
                to="/categories"
                className="category-detail-card-link"
              >
                Explore Other Categories
                <ArrowUpRight size={17} />
              </Link>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <nav
            className="category-pagination"
            aria-label="Category article pagination"
          >
            <button
              type="button"
              className="category-pagination-arrow"
              onClick={() => updatePage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
              <span>PREVIOUS</span>
            </button>

            <div className="category-pagination-numbers">
              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  className={
                    currentPage === page
                      ? "category-page-number active"
                      : "category-page-number"
                  }
                  onClick={() => updatePage(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {String(page).padStart(2, "0")}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="category-pagination-arrow"
              onClick={() => updatePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <span>NEXT</span>
              <ChevronRight size={18} />
            </button>
          </nav>
        )}
      </section>

      <section className="category-bottom-cta">
        <div>
          <span>KEEP EXPLORING</span>
          <h2>Curiosity creates opportunity.</h2>
          <p>
            Discover more ideas across the WeirdWealth journal.
          </p>
        </div>

        <Link to="/categories">
          Browse All Categories
          <ArrowUpRight size={18} />
        </Link>
      </section>
    </div>
  );
}

export default function Categories() {
  const { slug } = useParams();

  const selectedCategory = categories.find(
    (category) => category.slug === slug
  );

  return (
    <>
      <Header />

      <main className="inner-page categories-page">
        {!slug ? (
          <CategoryDirectory />
        ) : selectedCategory ? (
          <CategoryDetail category={selectedCategory} />
        ) : (
          <section className="category-detail-page">
            <div className="category-detail-empty category-not-found">
              <h3>Category not found</h3>

              <p>
                The category you are looking for does not exist.
              </p>

              <Link
                to="/categories"
                className="category-detail-card-link"
              >
                <ArrowLeft size={17} />
                Back to Categories
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
