"use client";

import { cn } from "@/libs/cn";

export default function EditorialCard({
  children,
  className,
  variant = "default",
  pageCurl = false,
}) {
  return (
    <article
      className={cn(
        "relative bg-paper border border-secondary-200 overflow-hidden",
        variant === "elevated" && "shadow-lg shadow-secondary-200/50",
        variant === "flat" && "shadow-none",
        variant === "inset" && "shadow-inner bg-parchment",
        pageCurl && "page-curl",
        className,
      )}
    >
      {children}
    </article>
  );
}

// Subcomponent for card header
EditorialCard.Header = function EditorialCardHeader({ children, className }) {
  return (
    <header
      className={cn("border-b border-secondary-200 p-6 md:p-8", className)}
    >
      {children}
    </header>
  );
};

// Subcomponent for card body
EditorialCard.Body = function EditorialCardBody({ children, className }) {
  return <div className={cn("p-6 md:p-8", className)}>{children}</div>;
};

// Subcomponent for card footer
EditorialCard.Footer = function EditorialCardFooter({ children, className }) {
  return (
    <footer
      className={cn(
        "border-t border-secondary-200 p-6 md:p-8 bg-parchment/50",
        className,
      )}
    >
      {children}
    </footer>
  );
};
