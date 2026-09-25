import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  serif?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  serif = false,
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const maxW = align === "center" ? "max-w-2xl" : "max-w-3xl";

  return (
    <div className={`${alignClass} ${maxW} ${className}`}>
      {eyebrow && (
        <span
          className="eyebrow mb-3 inline-block"
          style={{ color: dark ? "var(--color-sage-light)" : "var(--color-primary)" }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={serif ? "font-serif" : ""}
        style={{
          fontFamily: serif ? "var(--font-serif)" : undefined,
          color: dark ? "white" : "var(--color-text)",
          marginTop: eyebrow ? "0.25rem" : undefined,
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-3 text-sm sm:text-base leading-relaxed"
          style={{ color: dark ? "rgba(255,255,255,0.85)" : "var(--color-text-secondary)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
