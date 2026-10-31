
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  ArrowUpRight,
  Search,
  CalendarDays,
  Clock3,
  ChevronLeft,
  ChevronRight,
  X,
  BookOpen,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import articles from "../data/articles";

const categories = [
  "All",
  "Finance",
  "Digital Skills",
  "Passive Income",
  "Smart Living",
  "Community",
];

const ARTICLES_PER_PAGE = 6;

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

function getAuthor(article) {
  return article.author?.name || article.author || "WeirdWealth Team";
}

function getImage(article) {
  return article.image || article.imageUrl || article.coverImage || "";
}

function getDescription(article) {
  return (
    article.excerpt ||
    article.description ||
    "Discover new perspectives and practical insights from WeirdWealth."
  );
}

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") || "";
  const activeCategory = categories.includes(searchParams.get("category"))
    ? searchParams.get("category")
    : "All";

  const requestedPage = Math.max(
    1,
    Number(searchParams.get("page")) || 1
  );

  const showFeatured = !search.trim() && activeCategory === "All";
  const featuredArticle = showFeatured ? articles[0] : null;

  const filteredArticles = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return articles.filter((article) => {
      const title = article.title || "";
      const description = getDescription(article);
      const category = article.category || "";
      const author = getAuthor(article);

      const searchableText =
        `${title} ${description} ${category} ${author}`.toLowerCase();

      const matchesSearch = searchableText.includes(normalizedSearch);

      const matchesCategory =
        activeCategory === "All" ||
        category.toLowerCase() === activeCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const listingArticles = useMemo(() => {
    if (!featuredArticle) return filteredArticles;

    return filteredArticles.filter(
      (article) => getSlug(article) !== getSlug(featuredArticle)
    );
  }, [filteredArticles, featuredArticle]);

  const totalPages = Math.max(
    1,
    Math.ceil(listingArticles.length / ARTICLES_PER_PAGE)
  );

  const safePage = Math.min(requestedPage, totalPages);

  const paginatedArticles = listingArticles.slice(
    (safePage - 1) * ARTICLES_PER_PAGE,
    safePage * ARTICLES_PER_PAGE
  );

  const pageNumbers = useMemo(() => {
    const maxVisiblePages = 5;

    let startPage = Math.max(
      1,
      safePage - Math.floor(maxVisiblePages / 2)
    );

    let endPage = Math.min(
      totalPages,
      startPage + maxVisiblePages - 1
    );

    startPage = Math.max(1, endPage - maxVisiblePages + 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  }, [safePage, totalPages]);

  function updateParams(updates) {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params, { replace: true });
  }

  function updateSearch(value) {
    updateParams({
      q: value.trim() ? value : "",
      page: "",
    });
  }

  function updateCategory(category) {
    updateParams({
      category: category === "All" ? "" : category,
      page: "",
    });
  }

  function changePage(page) {
    const nextPage = Math.min(Math.max(1, page), totalPages);

    updateParams({
      page: nextPage > 1 ? nextPage : "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function clearFilters() {
    setSearchParams({}, { replace: true });
  }

  return (
    <>
      <Header />

      <main className="inner-page blog-page">

        {/* BLOG HERO */}
        <section className="inner-page-hero blog-premium-hero blog-image-hero">
          <div className="blog-hero-background" aria-hidden="true" />
          <div className="blog-hero-overlay" aria-hidden="true" />

          <div className="container blog-hero-inner">
            <span className="section-eyebrow">
              THE WEIRDWEALTH JOURNAL
            </span>

            <h1>
              Knowledge That
              <br />
              <span className="accent-text">
                Moves You Forward.
              </span>
            </h1>

            <p>
              Smarter ideas on money, digital skills and modern living.
            </p>

            <div className="blog-hero-bottom">
              <span>
                <BookOpen size={16} />
                Thoughtful reads. Practical ideas.
              </span>

              <span>{articles.length} Stories</span>
            </div>
          </div>
        </section>

        {/* FEATURED ARTICLE */}
        {featuredArticle && (
          <section className="blog-featured-section">
            <div className="container">
              <div className="blog-featured-heading">
                <span className="section-eyebrow">EDITOR'S PICK</span>
                <span className="blog-featured-line" />
              </div>

              <article className="blog-featured-card">
                <Link
                  to={`/blog/${getSlug(featuredArticle)}`}
                  className="blog-featured-image"
                  aria-label={`Read ${featuredArticle.title}`}
                >
                  {getImage(featuredArticle) ? (
                    <img
                      src={getImage(featuredArticle)}
                      alt={featuredArticle.title || "Featured article"}
                    />
                  ) : (
                    <div className="blog-image-placeholder">
                      WEIRDWEALTH
                    </div>
                  )}
                </Link>

                <div className="blog-featured-info">
                  <span className="blog-article-category">
                    {featuredArticle.category || "Featured"}
                  </span>

                  <span className="blog-featured-label">
                    FEATURED STORY
                  </span>

                  <h2>
                    <Link to={`/blog/${getSlug(featuredArticle)}`}>
                      {featuredArticle.title}
                    </Link>
                  </h2>

                  <p>{getDescription(featuredArticle)}</p>

                  <div className="blog-article-meta">
                    <span>
                      <CalendarDays size={15} />
                      {featuredArticle.date || "Latest"}
                    </span>

                    <span>
                      <Clock3 size={15} />
                      {featuredArticle.readTime || "5 min read"}
                    </span>
                  </div>

                  <span className="blog-author-name">
                    By {getAuthor(featuredArticle)}
                  </span>

                  <Link
                    to={`/blog/${getSlug(featuredArticle)}`}
                    className="blog-featured-link"
                  >
                    Explore Story
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </article>
            </div>
          </section>
        )}

        {/* BLOG CONTENT */}
        <section className="blog-content-section section-padding">
          <div className="container">
            <div className="blog-toolbar">
              <div className="blog-section-heading">
                <span className="section-eyebrow">THE LATEST</span>
                <h2>Explore our insights</h2>

                <p className="blog-results-count">
                  {showFeatured
                    ? `${filteredArticles.length} stories`
                    : `${listingArticles.length} matching articles`}
                </p>
              </div>

              <label className="blog-search">
                <Search size={19} aria-hidden="true" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => updateSearch(event.target.value)}
                  placeholder="Search articles..."
                  aria-label="Search articles"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => updateSearch("")}
                    aria-label="Clear search"
                    className="blog-search-clear"
                  >
                    <X size={17} />
                  </button>
                )}
              </label>
            </div>

            {/* CATEGORY FILTERS */}
            <div
              className="blog-category-filters"
              aria-label="Filter articles by category"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={activeCategory === category ? "active" : ""}
                  onClick={() => updateCategory(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* ARTICLE GRID */}
            {paginatedArticles.length > 0 ? (
              <>
                <div className="blog-articles-grid">
                  {paginatedArticles.map((article) => {
                    const image = getImage(article);
                    const slug = getSlug(article);

                    return (
                      <article className="blog-article-card" key={slug}>
                        <Link
                          to={`/blog/${slug}`}
                          className="blog-article-image"
                          aria-label={`Read ${article.title}`}
                        >
                          {image ? (
                            <img
                              src={image}
                              alt={article.title || "Article"}
                              loading="lazy"
                            />
                          ) : (
                            <div className="blog-image-placeholder">
                              WEIRDWEALTH
                            </div>
                          )}

                          <span className="blog-card-arrow">
                            <ArrowUpRight size={20} />
                          </span>
                        </Link>

                        <div className="blog-article-info">
                          <span className="blog-article-category">
                            {article.category || "Insights"}
                          </span>

                          <h3>
                            <Link to={`/blog/${slug}`}>
                              {article.title || "Untitled article"}
                            </Link>
                          </h3>

                          <p>{getDescription(article)}</p>

                          <div className="blog-article-meta">
                            <span>
                              <CalendarDays size={14} />
                              {article.date || "Latest"}
                            </span>

                            <span>
                              <Clock3 size={14} />
                              {article.readTime || "5 min read"}
                            </span>
                          </div>

                          <span className="blog-author-name">
                            By {getAuthor(article)}
                          </span>

                          <Link
                            to={`/blog/${slug}`}
                            className="blog-read-link"
                          >
                            Read Article
                            <ArrowUpRight size={17} />
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <nav
                    className="blog-pagination"
                    aria-label="Article pagination"
                  >
                    <button
                      type="button"
                      onClick={() => changePage(safePage - 1)}
                      disabled={safePage === 1}
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {pageNumbers.map((page) => (
                      <button
                        key={page}
                        type="button"
                        className={safePage === page ? "active" : ""}
                        onClick={() => changePage(page)}
                        aria-label={`Page ${page}`}
                        aria-current={safePage === page ? "page" : undefined}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => changePage(safePage + 1)}
                      disabled={safePage === totalPages}
                      aria-label="Next page"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </nav>
                )}
              </>
            ) : (
              <div className="blog-empty-state">
                <div className="blog-empty-icon">
                  <Search size={28} />
                </div>

                <h3>No articles found</h3>

                <p>
                  Try another search term or select a different category.
                </p>

                <button type="button" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
