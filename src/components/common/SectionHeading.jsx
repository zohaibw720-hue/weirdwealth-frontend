
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  alignment = "left",
  light = false,
  className = "",
}) {
  return (
    <div
      className={[
        "section-heading",
        `section-heading-${alignment}`,
        light ? "section-heading-light" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && (
        <span className="section-eyebrow">
          {eyebrow}
        </span>
      )}

      {title && (
        <h2 className="section-title">
          {title}{" "}
          {highlight && (
            <span className="section-title-highlight">
              {highlight}
            </span>
          )}
        </h2>
      )}

      {description && (
        <p className="section-description">
          {description}
        </p>
      )}
    </div>
  );
}
