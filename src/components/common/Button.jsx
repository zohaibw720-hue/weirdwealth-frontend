
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function Button({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  icon = "arrow-up",
  iconPosition = "right",
  className = "",
  disabled = false,
  fullWidth = false,
  ariaLabel,
}) {
  const Icon =
    icon === "arrow-right"
      ? ArrowRight
      : icon === "arrow-up"
        ? ArrowUpRight
        : null;

  const buttonClasses = [
    "button",
    `button-${variant}`,
    `button-${size}`,
    fullWidth ? "button-full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconElement = Icon && (
    <Icon size={17} strokeWidth={2} aria-hidden="true" />
  );

  const content = (
    <>
      {iconPosition === "left" && iconElement}

      <span>{children}</span>

      {iconPosition === "right" && iconElement}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={buttonClasses}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        onClick={disabled ? (event) => event.preventDefault() : onClick}
        tabIndex={disabled ? -1 : undefined}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={buttonClasses}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        onClick={onClick}
        tabIndex={disabled ? -1 : undefined}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
