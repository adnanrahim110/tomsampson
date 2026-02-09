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
        "relative bg-white border border-secondary-200 overflow-hidden",
        variant === "elevated" && "border-l-4 border-l-primary-500",
        variant === "flat" && "",
        variant === "inset" && "bg-secondary-50",
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
