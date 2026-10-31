
import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setIsSuccess(false);
      setMessage("Please enter your email address.");
      return;
    }

    if (!emailPattern.test(trimmedEmail)) {
      setIsSuccess(false);
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsSuccess(true);
    setMessage(
      "Thank you for your interest! Newsletter registration will be available soon."
    );
    setEmail("");
  };

  return (
    <section
      className="newsletter-section"
      aria-labelledby="newsletter-title"
    >
      <div className="container">
        <div className="newsletter-card">
          <div className="newsletter-content">
            <span className="section-eyebrow newsletter-eyebrow">
              <span className="eyebrow-line" aria-hidden="true" />
              STAY AHEAD
            </span>

            <h2 id="newsletter-title">
              Good ideas.
              <br />
              <span>Delivered to you.</span>
            </h2>

            <p className="newsletter-description">
              Get thoughtful insights, practical knowledge and
              fresh perspectives on wealth, digital skills and
              smarter living — straight to your inbox.
            </p>

            <form
              className="newsletter-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <label className="newsletter-input-wrapper">
                <Mail size={19} aria-hidden="true" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setMessage("");
                    setIsSuccess(false);
                  }}
                  aria-label="Email address"
                  aria-describedby="newsletter-message"
                  autoComplete="email"
                  required
                />
              </label>

              <button
                type="submit"
                className="newsletter-submit"
              >
                Subscribe
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </form>

            <div
              id="newsletter-message"
              className={`newsletter-message ${
                isSuccess ? "newsletter-message-success" : ""
              }`}
              role="status"
              aria-live="polite"
            >
              {message && (
                <>
                  {isSuccess && (
                    <CheckCircle2 size={17} aria-hidden="true" />
                  )}
                  <span>{message}</span>
                </>
              )}
            </div>

            <span className="newsletter-privacy">
              Thoughtful emails only. No spam.
            </span>
          </div>

          <div className="newsletter-decoration" aria-hidden="true">
            <div className="newsletter-decoration-circle">
              <span>W</span>
            </div>
            <span className="newsletter-decoration-label">
              KNOWLEDGE THAT MOVES YOU
            </span>
            <span className="newsletter-decoration-number">
              01 — WW
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
