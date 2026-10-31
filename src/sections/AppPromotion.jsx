
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Wallet,
  Home,
  Compass,
  Heart,
  UserRound,
} from "lucide-react";

import { Link } from "react-router-dom";

const appFeatures = [
  "Practical wealth-building insights",
  "Learn at your own pace",
  "Ideas for smarter everyday decisions",
];

const appCategories = [
  {
    label: "Finance",
    icon: Wallet,
  },
  {
    label: "Learning",
    icon: BookOpen,
  },
];

export default function AppPromotion() {
  return (
    <section
      className="app-promotion-section"
      id="mobile-app"
      aria-labelledby="app-promotion-title"
    >
      <div className="container app-promotion-container">
        {/* App Promotion Content */}
        <div className="app-promotion-content">
          <span className="section-eyebrow app-promotion-eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            WEIRDWEALTH ON THE GO
          </span>

          <h2 id="app-promotion-title">
            Smarter thinking.
            <br />
            <span>Anywhere you go.</span>
          </h2>

          <p className="app-promotion-description">
            Your journey towards smarter financial decisions
            doesn't have to stop when you leave your desk.
            Discover a more convenient way to explore, learn
            and grow.
          </p>

          <ul className="app-feature-list">
            {appFeatures.map((feature) => (
              <li key={feature}>
                <CheckCircle2 size={19} aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="app-promotion-actions">
            <Link
              to="/contact"
              className="app-early-access-button"
              aria-label="Contact WeirdWealth about early access"
            >
              Get Early Access
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>

            <span className="app-coming-soon-label">
              <span aria-hidden="true" />
              COMING SOON
            </span>
          </div>
        </div>

        {/* Mobile App Visual */}
        <div className="app-promotion-visual">
          <div className="app-glow" aria-hidden="true" />

          {/* Top Floating Card */}
          <div className="app-floating-note app-floating-note-top">
            <span className="app-floating-icon" aria-hidden="true">
              <TrendingUp size={19} />
            </span>

            <span>
              <strong>Think smarter</strong>
              <small>Grow your knowledge</small>
            </span>
          </div>

          {/* Phone Mockup */}
          <div className="phone-mockup">
            <div className="phone-frame">
              <div className="phone-screen">
                <div className="phone-status-bar">
                  <span>9:41</span>
                  <span className="phone-status-icons" aria-hidden="true">
                    ● ● ▰
                  </span>
                </div>

                <div className="phone-notch" aria-hidden="true" />

                {/* App Header */}
                <div className="phone-app-header">
                  <div className="phone-brand">
                    <span className="phone-brand-mark">W</span>
                    <span>WeirdWealth</span>
                  </div>

                  <span className="phone-avatar">W</span>
                </div>

                {/* Welcome */}
                <div className="phone-welcome">
                  <span>YOUR DAILY EDGE</span>

                  <h3>
                    Make your
                    <br />
                    next move count.
                  </h3>

                  <p>Ideas that move you forward.</p>
                </div>

                {/* Featured Article */}
                <div className="phone-highlight-card">
                  <div className="phone-highlight-top">
                    <span>FEATURED INSIGHT</span>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </div>

                  <div className="phone-highlight-image">
                    <div className="phone-image-symbol">
                      <TrendingUp size={35} aria-hidden="true" />
                    </div>
                  </div>

                  <h4>Build better money habits</h4>
                  <span className="phone-read-time">5 MIN READ</span>
                </div>

                {/* Categories */}
                <div className="phone-explore-heading">
                  <strong>Explore your interests</strong>
                  <span>View all</span>
                </div>

                <div className="phone-mini-categories">
                  {appCategories.map((category) => {
                    const Icon = category.icon;

                    return (
                      <div key={category.label}>
                        <Icon size={17} aria-hidden="true" />
                        <span>{category.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Navigation */}
                <div className="phone-bottom-nav" aria-hidden="true">
                  <span className="phone-nav-active">
                    <Home size={17} />
                  </span>
                  <span><Compass size={17} /></span>
                  <span><Heart size={17} /></span>
                  <span><UserRound size={17} /></span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Floating Card */}
          <div className="app-floating-note app-floating-note-bottom">
            <span className="app-floating-icon" aria-hidden="true">
              <BookOpen size={19} />
            </span>

            <span>
              <strong>Learn every day</strong>
              <small>Knowledge on your time</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
