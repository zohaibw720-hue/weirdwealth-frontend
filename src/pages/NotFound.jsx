
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="not-found-page">
        <section className="not-found-content">
          <div className="not-found-number">404</div>

          <span className="section-eyebrow">
            PAGE NOT FOUND
          </span>

          <h1>
            Looks like you've
            <br />
            taken a <span className="accent-text">wrong turn.</span>
          </h1>

          <p>
            The page you're looking for may have been moved,
            removed, or doesn't exist. Let's get you back on track.
          </p>

          <div className="not-found-actions">
            <Link to="/" className="primary-button">
              <ArrowLeft size={18} />
              Back to Homepage
            </Link>

            <Link to="/blog" className="secondary-button">
              Explore Insights
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="not-found-decoration">
            WEIRDWEALTH — MODERN IDEAS. SMARTER LIVING.
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
