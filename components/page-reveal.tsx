import type { ReactNode } from "react";

type PageRevealProps = {
  children: ReactNode;
  className?: string;
};

export function PageReveal({ children, className }: PageRevealProps) {
  return (
    <div className={["reveal-on-load", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
