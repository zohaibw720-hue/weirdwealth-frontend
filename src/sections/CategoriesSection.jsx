
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { categories } from "../data/categories";
import CategoryCard from "../components/cards/CategoryCard";

export default function CategoriesSection() {
  const categoryCount = categories?.length ?? 0;

  if (categoryCount === 0) {
    return null;
  }

  return (
    <section
      className="categories-section section-padding"
      aria-labelledby="categories-title"
    >
      <div className="container">
        {/* Section Heading */}
        <div className="categories-top">
          <div className="categories-heading">
            <span className="section-eyebrow">
              <span
                className="eyebrow-line"
                aria-hidden="true"
              />
              EXPLORE OUR WORLD
            </span>

            <h2 id="categories-title">
              What We <span>Cover.</span>
            </h2>

            <p>
              Everything you need to think smarter, build
              valuable skills, and create a life with more
              possibilities.
            </p>
          </div>

          <Link
            to="/categories"
            className="view-all-link"
            aria-label="View all WeirdWealth categories"
          >
            View all categories
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>

        {/* Category Cards */}
        <div className="categories-grid">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>

        {/* Section Footer */}
        <div className="categories-bottom">
          <span>
            01 — {String(categoryCount).padStart(2, "0")}
          </span>

          <span
            className="categories-bottom-line"
            aria-hidden="true"
          />

          <span>KNOWLEDGE THAT MOVES YOU FORWARD</span>
        </div>
      </div>
    </section>
  );
}
