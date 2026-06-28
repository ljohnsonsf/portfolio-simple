"use client";

import { useEffect, useState } from "react";

type CaseStudySideNavLink = {
  label: string;
  href: string;
};

export function CaseStudySideNav({ links }: { links: CaseStudySideNavLink[] }) {
  const [activeHref, setActiveHref] = useState(links[0]?.href ?? "");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sectionIds = links.map((link) => link.href.slice(1));
    const firstHref = links[0]?.href ?? "";

    const updateNavState = () => {
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section));
      const activeLine = window.innerHeight * 0.42;
      const current =
        sections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= activeLine && rect.bottom >= activeLine;
        }) ??
        [...sections]
          .reverse()
          .find((section) => section.getBoundingClientRect().top <= activeLine);

      const nextActiveHref = current ? `#${current.id}` : firstHref;
      const body = document.querySelector<HTMLElement>(".case-study-body");
      const isPastHero = body
        ? body.getBoundingClientRect().top <= window.innerHeight * 0.32
        : false;

      setActiveHref(nextActiveHref);
      setIsVisible(isPastHero && nextActiveHref !== firstHref);
    };

    updateNavState();
    window.addEventListener("scroll", updateNavState, { passive: true });
    window.addEventListener("resize", updateNavState);

    return () => {
      window.removeEventListener("scroll", updateNavState);
      window.removeEventListener("resize", updateNavState);
    };
  }, [links]);

  return (
    <aside
      className={`case-study-side-nav ${isVisible ? "is-visible" : ""}`}
      aria-label="Case study sections"
    >
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a className={activeHref === link.href ? "is-active" : undefined} href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
