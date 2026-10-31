
export function formatDate(date, options = {}) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...options,
  }).format(parsedDate);
}

export function getReadingTime(content, wordsPerMinute = 200) {
  if (!content || typeof content !== "string") {
    return 1;
  }

  const wordCount = content.trim().split(/\s+/).length;

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function truncateText(text, maxLength = 160) {
  if (!text || typeof text !== "string") {
    return "";
  }

  const trimmedText = text.trim();

  if (trimmedText.length <= maxLength) {
    return trimmedText;
  }

  return `${trimmedText.slice(0, maxLength).trimEnd()}...`;
}

export function getInitials(name) {
  if (!name || typeof name !== "string") {
    return "WW";
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
