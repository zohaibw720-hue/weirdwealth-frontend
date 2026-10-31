
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  Wallet,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import useScrollAnimation from "../hooks/useScrollAnimation";

export default function HeroSection() {
  const [backgroundError, setBackgroundError] = useState(false);

  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    once: true,
  });

  return (
    <section
      className={`hero-section ${isVisible ? "hero-is-visible" : ""}`}
      aria-labelledby="hero-title"
      ref={elementRef}
    >
      {/* Background */}
      <div
        className={`hero-background ${
          backgroundError ? "hero-background-fallback" : ""
        }`}
        aria-hidden="true"
      >
        {!backgroundError && (
          <img
            src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2400&q=90"
            alt=""
            fetchPriority="high"
            onError={() => setBackgroundError(true)}
          />
        )}
      </div>

      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="container hero-container">
        {/* Main Hero Content */}
        <div className="hero-content">
          <h1 id="hero-title">
            Make Money.
            <br />
            Build Skills.
            <br />
            <span>Live Freely.</span>
          </h1>

          <p className="hero-description">
            Discover smarter ways to earn, grow your knowledge,
            and create a life where financial confidence meets
            personal freedom.
          </p>

          {/* Hero Actions */}
          <div className="hero-buttons">
            <Link to="/categories" className="primary-button">
              Explore Opportunities
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <Link to="/about" className="secondary-button">
              <span className="play-icon" aria-hidden="true">
                <ArrowUpRight size={16} />
              </span>
              Discover Our Story
            </Link>
          </div>

          {/* Trust Information */}
          <div className="hero-trust">
            <div className="trust-avatars" aria-hidden="true">
              <span>W</span>
              <span>W</span>
              <span>W</span>
            </div>

            <p>
              <strong>Learn. Grow. Build.</strong>
              <br />
              A smarter approach to modern wealth.
            </p>
          </div>
        </div>

        {/* Floating Growth Card */}
        <div className="hero-floating-card">
          <div className="floating-icon" aria-hidden="true">
            <TrendingUp size={20} />
          </div>

          <div>
            <span>Growth Mindset</span>
            <strong>Build Your Future</strong>
          </div>

          <ArrowRight
            size={18}
            className="floating-arrow"
            aria-hidden="true"
          />
        </div>

        {/* Floating Statistics Card */}
        <div className="hero-stat-card">
          <div className="stat-icon" aria-hidden="true">
            <Wallet size={20} />
          </div>

          <div>
            <span>Smarter Living</span>
            <strong>More Possibilities</strong>
          </div>
        </div>

        {/* Editorial Accent */}
        <div className="hero-editorial-mark" aria-hidden="true">
          <Sparkles size={15} />
          <span>THINK DIFFERENTLY. LIVE BETTER.</span>
        </div>
      </div>

      {/* Hero Bottom Information */}
      <div className="hero-bottom-line">
        <span>FINANCIAL KNOWLEDGE</span>
        <span>01 — 05</span>
        <span>BUILD A BETTER FUTURE</span>
      </div>
    </section>
  );
}
