
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Globe,
  Send,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const contactDetails = [
  {
    icon: Mail,
    title: "Email us",
    description: "For general questions and inquiries",
    value: "hello@weirdwealth.com",
    href: "mailto:hello@weirdwealth.com",
  },
  {
    icon: MessageCircle,
    title: "Start a conversation",
    description: "Have an idea or collaboration in mind?",
    value: "We would love to hear from you",
    href: "mailto:hello@weirdwealth.com",
  },
  {
    icon: Globe,
    title: "Our platform",
    description: "Explore ideas for a smarter financial future",
    value: "WeirdWealth",
    href: "/",
  },
];

const initialFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSubmitted(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject.";
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must contain at least 10 characters.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }

    setErrors({});
    setFormData(initialFormData);
    setSubmitted(true);
  };

  return (
    <>
      <Header />

      <main className="contact-page">
        {/* HERO */}
        <section className="contact-hero contact-image-hero">
          <div className="contact-hero-background" aria-hidden="true" />
          <div className="contact-hero-overlay" aria-hidden="true" />

          <div className="contact-container contact-hero-content">
            <span className="contact-eyebrow">
              <Sparkles size={15} />
              LET'S CONNECT
            </span>

            <h1>
              Every great idea
              <br />
              starts with a <span>conversation.</span>
            </h1>

            <p>
              Have a question, a story to share, or an opportunity to
              collaborate? We are always open to meaningful conversations.
            </p>

            <a href="#contact-form" className="contact-hero-link">
              Get in touch
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="contact-hero-bottom">
            <span>WEIRDWEALTH / CONTACT</span>
            <span>LET'S START SOMETHING MEANINGFUL</span>
          </div>
        </section>

        {/* CONTACT CONTENT */}
        <section className="contact-main-section">
          <div className="contact-container">
            <div className="contact-section-heading">
              <span className="contact-eyebrow contact-eyebrow-dark">
                CONTACT WEIRDWEALTH
              </span>

              <h2>
                Let's make something
                <br />
                <span>meaningful together.</span>
              </h2>

              <p>
                Whether you are reaching out with a question, feedback, or
                partnership idea, we would be happy to hear from you.
              </p>
            </div>

            <div className="contact-layout">
              {/* LEFT SIDE */}
              <div className="contact-information">
                <div className="contact-info-heading">
                  <span>GET IN TOUCH</span>
                  <h3>We are just a message away.</h3>
                  <p>Choose the best way to connect with our team.</p>
                </div>

                <div className="contact-details-list">
                  {contactDetails.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        href={item.href}
                        key={item.title}
                        className="contact-detail-card"
                      >
                        <div className="contact-detail-icon">
                          <Icon size={21} strokeWidth={1.7} />
                        </div>

                        <div className="contact-detail-content">
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                          <strong>{item.value}</strong>
                        </div>

                        <ArrowUpRight
                          className="contact-detail-arrow"
                          size={19}
                        />
                      </a>
                    );
                  })}
                </div>

                <div className="contact-social-box">
                  <span>STAY CONNECTED</span>
                  <h3>Follow the conversation.</h3>

                  <div className="contact-social-links">
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      title="Instagram"
                    >
                      <Globe size={19} />
                    </a>

                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      title="LinkedIn"
                    >
                      <MessageCircle size={19} />
                    </a>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE FORM */}
              <div className="contact-form-card" id="contact-form">
                <div className="contact-form-heading">
                  <span>WRITE TO US</span>
                  <h3>Send us a message.</h3>
                  <p>
                    Fill in the details below and tell us what is on your mind.
                  </p>
                </div>

                {submitted && (
                  <div className="contact-success-message" role="status">
                    <CheckCircle2 size={21} />
                    <div>
                      <strong>Thank you for reaching out!</strong>
                      <p>
                        Your form has been validated successfully. This
                        frontend demo does not send or store messages.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="contact-form-row">
                    <div className="contact-field">
                      <label htmlFor="contact-name">Your name</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                          errors.name ? "contact-name-error" : undefined
                        }
                      />
                      {errors.name && (
                        <span
                          className="contact-field-error"
                          id="contact-name-error"
                        >
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="contact-field">
                      <label htmlFor="contact-email">Email address</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? "contact-email-error" : undefined
                        }
                      />
                      {errors.email && (
                        <span
                          className="contact-field-error"
                          id="contact-email-error"
                        >
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-subject">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      placeholder="What would you like to discuss?"
                      value={formData.subject}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={
                        errors.subject ? "contact-subject-error" : undefined
                      }
                    />
                    {errors.subject && (
                      <span
                        className="contact-field-error"
                        id="contact-subject-error"
                      >
                        {errors.subject}
                      </span>
                    )}
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-message">Your message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="6"
                      placeholder="Tell us a little about your idea..."
                      value={formData.message}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "contact-message-error" : undefined
                      }
                    />
                    {errors.message && (
                      <span
                        className="contact-field-error"
                        id="contact-message-error"
                      >
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <button type="submit" className="contact-submit-button">
                    Send message
                    <Send size={17} />
                  </button>

                  <p className="contact-form-note">
                    This is currently a frontend-only form. Messages are not
                    delivered or saved until an email service or backend is
                    connected.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="contact-bottom-cta">
          <div className="contact-container contact-bottom-content">
            <div>
              <span>KEEP EXPLORING</span>
              <h2>
                Ideas are better
                <br />
                when they are shared.
              </h2>
            </div>

            <Link to="/blog" className="contact-bottom-button">
              Explore our insights
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Contact;
