
import {
  Compass,
  BookOpen,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    id: "01",
    title: "Discover",
    description:
      "Explore fresh ideas, practical resources, and opportunities that match your goals.",
    icon: Compass,
    label: "FIND YOUR DIRECTION",
  },
  {
    id: "02",
    title: "Learn",
    description:
      "Build valuable financial knowledge and digital skills through useful insights.",
    icon: BookOpen,
    label: "INVEST IN KNOWLEDGE",
  },
  {
    id: "03",
    title: "Grow",
    description:
      "Put your knowledge into action and create more possibilities for your future.",
    icon: TrendingUp,
    label: "BUILD YOUR FUTURE",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="how-it-works-section"
      aria-labelledby="how-it-works-title"
    >
      <div className="container">
        {/* Section Heading */}
        <div className="how-header">
          <div>
            <span className="section-eyebrow">
              <span className="eyebrow-line" aria-hidden="true" />
              YOUR JOURNEY STARTS HERE
            </span>

            <h2 id="how-it-works-title">
              Simple Steps.
              <br />
              <span>Meaningful Growth.</span>
            </h2>
          </div>

          <p className="how-intro">
            Building a better future doesn't have to be
            complicated. Start with knowledge, take action,
            and keep moving forward.
          </p>
        </div>

        {/* Process Steps */}
        <div className="how-steps">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article className="how-step" key={step.id}>
                <div className="how-step-top">
                  <span className="how-step-number">
                    {step.id}
                  </span>

                  <span className="how-step-label">
                    {step.label}
                  </span>
                </div>

                <div className="how-step-icon" aria-hidden="true">
                  <Icon size={27} strokeWidth={1.6} />
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

                <div className="how-step-bottom">
                  <span>STEP {step.id}</span>

                  {index !== steps.length - 1 && (
                    <ArrowRight
                      size={19}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="how-bottom">
          <div>
            <span>READY TO MOVE FORWARD?</span>
            <p>Your next opportunity starts with one small step.</p>
          </div>

          <Link to="/categories" className="how-cta">
            Start Exploring
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
