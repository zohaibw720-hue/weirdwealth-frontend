
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Target,
  Lightbulb,
  TrendingUp,
  Sparkles,
  Compass,
  ShieldCheck,
  BookOpen,
  Users,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const values = [
  {
    icon: Target,
    number: "01",
    title: "Our Mission",
    description:
      "Make financial knowledge, digital opportunities and modern living easier to understand and apply in everyday life.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Our Vision",
    description:
      "Help people discover smarter ideas, develop valuable skills and make confident decisions about their future.",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Our Approach",
    description:
      "We bring together practical insights, clear information and fresh perspectives that encourage meaningful progress.",
  },
];

const principles = [
  {
    icon: BookOpen,
    title: "Knowledge that matters",
    description:
      "Useful ideas and insights designed to make complex topics easier to understand.",
  },
  {
    icon: Compass,
    title: "A broader perspective",
    description:
      "Exploring the connections between money, technology, skills, culture and everyday life.",
  },
  {
    icon: ShieldCheck,
    title: "Clarity over complexity",
    description:
      "Straightforward content that respects your time and helps you think independently.",
  },
  {
    icon: Users,
    title: "Progress together",
    description:
      "Encouraging curiosity, learning and opportunities that create a positive impact.",
  },
];

export default function About() {
  return (
    <>
      <Header />

      <main className="about-page">
        {/* ABOUT HERO */}
        <section className="about-hero about-hero-image">
          <div className="container about-hero-container">
            <div className="about-hero-content">
              <span className="about-eyebrow">
                <span className="about-eyebrow-dot" />
                THE STORY BEHIND WEIRDWEALTH
              </span>
<h1>
  Build Wealth.
  <br />
  <span>Live Better.</span>
</h1>

              <p className="about-hero-description">
              We make money, build skills, and create a life with more freedom.
              </p>

              <div className="about-hero-actions">
                <Link to="/categories" className="about-primary-button">
                  Explore Our Topics
                  <ArrowUpRight size={18} />
                </Link>

                <Link to="/blog" className="about-text-link">
                  Read our latest insights
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            <div className="about-hero-art" aria-hidden="true">
              <div className="about-art-glow" />

              <div className="about-art-orbit about-art-orbit-one" />
              <div className="about-art-orbit about-art-orbit-two" />

              <div className="about-art-center">
                <span className="about-art-center-small">THINK</span>
                <span className="about-art-center-large">DIFFERENT.</span>
                <span className="about-art-center-line" />
                <span className="about-art-center-small">LIVE BETTER</span>
              </div>

              <div className="about-art-card about-art-card-top">
                <Sparkles size={18} />
                <span>Ideas create possibilities</span>
              </div>

              <div className="about-art-card about-art-card-bottom">
                <TrendingUp size={19} />
                <span>Progress starts with knowledge</span>
              </div>

              <span className="about-art-index">WW / 001</span>
            </div>

            <div className="about-hero-bottom">
              <span>KNOWLEDGE</span>
              <span className="about-hero-bottom-line" />
              <span>OPPORTUNITY</span>
              <span className="about-hero-bottom-line" />
              <span>INDEPENDENCE</span>
            </div>
          </div>
        </section>

        {/* ABOUT STORY */}
        <section className="about-story section-padding">
          <div className="container about-story-grid">
            <div className="about-story-label">
              <span className="about-section-kicker">01 / WHO WE ARE</span>
              <span className="about-story-vertical">
                THE WEIRDWEALTH PERSPECTIVE
              </span>
            </div>

            <div className="about-story-content">
              <h2>
                Wealth is not just
                <br />
                what you <span>own.</span>
              </h2>

              <p className="about-story-lead">
                It is what you know, what you can create and the
                freedom to shape your own direction.
              </p>

              <p>
                At WeirdWealth, we believe modern wealth goes beyond
                a number in a bank account. It is built through
                knowledge, creativity, valuable skills, meaningful
                experiences and the ability to recognize opportunity.
              </p>

              <p>
                That is why we bring together ideas from finance,
                digital skills, passive income, smart living and
                community — giving curious minds a place to explore
                what is possible.
              </p>

              <Link to="/blog" className="about-inline-link">
                Explore our perspective
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="about-values-section section-padding">
          <div className="container">
            <div className="about-section-heading">
              <div>
                <span className="about-section-kicker">
                  02 / OUR FOUNDATION
                </span>

                <h2>
                  What drives <span>us forward.</span>
                </h2>
              </div>

              <p>
                Every story we share starts with a simple belief:
                better information can lead to better possibilities.
              </p>
            </div>

            <div className="about-values-grid">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <article
                    className="about-value-card"
                    key={value.number}
                  >
                    <div className="about-value-card-top">
                      <div className="about-value-icon">
                        <Icon size={24} strokeWidth={1.7} />
                      </div>

                      <span>{value.number}</span>
                    </div>

                    <h3>{value.title}</h3>
                    <p>{value.description}</p>

                    <div className="about-value-card-line" />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="about-principles-section section-padding">
          <div className="container">
            <div className="about-principles-heading">
              <span className="about-section-kicker">
                03 / WHAT WE BELIEVE
              </span>

              <h2>
                Built around ideas.
                <br />
                <span>Driven by purpose.</span>
              </h2>
            </div>

            <div className="about-principles-grid">
              {principles.map((principle, index) => {
                const Icon = principle.icon;

                return (
                  <article
                    className="about-principle"
                    key={principle.title}
                  >
                    <div className="about-principle-number">
                      0{index + 1}
                    </div>

                    <div className="about-principle-icon">
                      <Icon size={21} strokeWidth={1.8} />
                    </div>

                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="about-cta-section">
          <div className="container about-cta-inner">
            <span className="about-section-kicker">
              04 / YOUR NEXT CHAPTER
            </span>

            <h2>
              Stay curious.
              <br />
              <span>Think beyond ordinary.</span>
            </h2>

            <p>
              Discover fresh perspectives, practical knowledge and
              ideas that can help shape the way you think about
              tomorrow.
            </p>

            <div className="about-cta-actions">
              <Link to="/blog" className="about-primary-button">
                Discover Insights
                <ArrowUpRight size={18} />
              </Link>

              <Link to="/categories" className="about-cta-secondary">
                Explore Categories
              </Link>
            </div>

            <div className="about-cta-decoration" aria-hidden="true">
              WW.
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
