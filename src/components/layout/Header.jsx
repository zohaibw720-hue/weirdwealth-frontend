
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  ArrowUpRight,
  Search,
} from "lucide-react";

import Navigation from "./Navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Close menu with Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Prevent background scrolling while mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // Handle article search
  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/blog?q=${encodeURIComponent(query)}`);

    setSearchQuery("");
    closeMenu();
  };

  return (
    <header className="site-header">
      <div className="container header-inner">

        {/* Brand Logo */}
        <Link
          to="/"
          className="brand-logo"
          onClick={closeMenu}
          aria-label="WeirdWealth homepage"
        >
          <span className="brand-mark" aria-hidden="true">
            W
          </span>

          <span className="brand-name">
            Weird<span>Wealth</span>
          </span>
        </Link>

        {/* Main Navigation */}
        <div id="main-navigation">
          <Navigation
            className={menuOpen ? "nav-open" : ""}
            onNavigate={closeMenu}
          />
        </div>

        {/* Header Actions */}
        <div className="header-actions">

          {/* Search */}
          <form
            className="header-search"
            onSubmit={handleSearch}
            role="search"
          >
            <input
              type="search"
              placeholder="Search articles, topics..."
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              aria-label="Search articles and topics"
              autoComplete="off"
            />

            <button
              type="submit"
              aria-label="Search"
              disabled={!searchQuery.trim()}
            >
              <Search size={17} aria-hidden="true" />
            </button>
          </form>

          {/* Get Started */}
          <Link
            to="/contact"
            className="header-cta"
            onClick={closeMenu}
          >
            Get Started
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            {menuOpen ? (
              <X size={23} aria-hidden="true" />
            ) : (
              <Menu size={23} aria-hidden="true" />
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
