
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Camera,
  BriefcaseBusiness,
  Users,
  Play,
} from "lucide-react";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Our Categories", path: "/categories" },
  { label: "Latest Insights", path: "/blog" },
  { label: "Our Authors", path: "/authors" },
  { label: "Contact", path: "/contact" },
];

const exploreLinks = [
  { label: "Finance", path: "/categories/finance" },
  { label: "Digital Skills", path: "/categories/digital-skills" },
  { label: "Passive Income", path: "/categories/passive-income" },
  { label: "Smart Living", path: "/categories/smart-living" },
  { label: "Community", path: "/categories/community" },
];

const socialLinks = [
  {
    label: "Instagram",
    icon: Camera,
    url: "https://www.instagram.com/",
  },
  {
    label: "LinkedIn",
    icon: BriefcaseBusiness,
    url: "https://www.linkedin.com/",
  },
  {
    label: "Facebook",
    icon: Users,
    url: "https://www.facebook.com/",
  },
  {
    label: "YouTube",
    icon: Play,
    url: "https://www.youtube.com/",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) return;

    // Frontend demonstration only.
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="site-footer">

      {/* Main Footer */}
      <div className="footer-main container">

        {/* Brand Information */}
        <div className="footer-brand-column">
          <Link
            to="/"
            className="footer-logo"
            aria-label="WeirdWealth homepage"
          >
            <span className="footer-logo-mark" aria-hidden="true">
              W
            </span>

            <span>
              WeirdWealth
              <span className="footer-logo-dot">.</span>
            </span>
          </Link>

          <p className="footer-description">
            Explore new perspectives on money, skills and modern
            living. Build knowledge, make smarter decisions and
            shape your own definition of wealth.
          </p>

          {/* Social Links */}
          <div className="footer-socials" aria-label="Social media links">
            {socialLinks.map(({ label, icon: Icon, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${label} website`}
                title={label}
              >
                <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links-column">
          <h3>Explore</h3>

          <ul>
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.path}>
                  {link.label}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Category Links */}
        <div className="footer-links-column">
          <h3>Discover</h3>

          <ul>
            {exploreLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.path}>
                  {link.label}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <span className="footer-eyebrow">
            THE WEIRDWEALTH LETTER
          </span>

          <h3>
            Ideas worth <span>knowing.</span>
          </h3>

          <p>
            Get thoughtful insights and fresh perspectives
            delivered straight to your inbox.
          </p>

          <form
            className="footer-newsletter-form"
            onSubmit={handleSubscribe}
          >
            <Mail size={18} aria-hidden="true" />

            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setSubmitted(false);
              }}
              aria-label="Your email address"
              autoComplete="email"
              required
            />

            <button
              type="submit"
              aria-label="Subscribe to newsletter"
              disabled={!email.trim()}
            >
              <ArrowRight size={19} aria-hidden="true" />
            </button>
          </form>

          <span
            className="newsletter-note"
            aria-live="polite"
            role="status"
          >
            {submitted
              ? "Thanks for your interest! Newsletter signup is coming soon."
              : "Demo form only. No email is stored or sent yet."}
          </span>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">

          <p>
            © {new Date().getFullYear()} WeirdWealth.
            All rights reserved.
          </p>

          <div className="footer-legal-links">
            <Link to="/contact">Privacy & Legal Enquiries</Link>
          </div>

          <a href="#top" className="footer-back-top">
            Back to top
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>

        </div>
      </div>
    </footer>
  );
}
