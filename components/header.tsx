"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { profile } from "@/lib/profile";

const navLinks = [
  { href: "/", label: "Work", match: "work" },
  { href: "/about", label: "About", match: "about" },
  { href: profile.resumeUrl, label: "Resume", match: "resume" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isCaseStudy = /^\/work\/[^/]+\/?$/.test(pathname);

  const isActive = (match: string) => {
    if (match === "work") {
      return pathname === "/" || pathname === "/work";
    }

    return pathname.startsWith(`/${match}`);
  };

  return (
    <header className={`site-header reveal-on-load reveal-on-load--header${isCaseStudy ? " site-header--case-study" : ""}`}>
      <div className="profile-block">
        <Link className="avatar" href="/" aria-label="Go to home page">
          <Image
            src="/avatar-photo.png"
            alt="Lauren Johnson"
            width={72}
            height={72}
            priority
          />
        </Link>
        <span className="profile-text">
          <span className="profile-name">{profile.name}</span>
          <span className="profile-detail">Product Designer</span>
        </span>
          <div
            className={`profile-status${isCaseStudy ? " profile-status--hidden" : ""}`}
            aria-hidden={isCaseStudy}
            inert={isCaseStudy}
          >
            <h1 className="profile-headline">A designer who builds.</h1>
            <span className="profile-status__line">
              Currently designing at{" "}
              <a
                className="profile-status__company profile-status__company--kara"
                href="https://joinkara.com/"
                target="_blank"
                rel="noreferrer"
              >
                Kara
              </a>, previously at{" "}
              <a
                className="profile-status__company profile-status__company--commvault"
                href="https://www.commvault.com/"
                target="_blank"
                rel="noreferrer"
              >
                Commvault
              </a>,{" "}
              <a
                className="profile-status__company profile-status__company--learvo"
                href="https://learvo.com/"
                target="_blank"
                rel="noreferrer"
              >
                Learvo
              </a>, and{" "}
              <a
                className="profile-status__company profile-status__company--atlassian"
                href="https://www.atlassian.com/"
                target="_blank"
                rel="noreferrer"
              >
                Atlassian
              </a>
            </span>
            <div className="profile-pills" aria-label="Education">
              <span className="profile-pill">M.S. in HCI, Spring 2027</span>
              <span className="profile-pill"><span className="status-dot" aria-hidden="true" />Open to 2027 New Grad Opportunities</span>
            </div>
          </div>
      </div>

      <div
        className="header-actions"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setMenuOpen(false);
            event.currentTarget.querySelector("button")?.focus();
          }
        }}
      >
        <button
          className="mobile-nav-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d={menuOpen ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        <nav
          id="primary-navigation"
          className={`primary-nav${menuOpen ? " primary-nav--open" : ""}`}
          aria-label="Primary navigation"
          onClick={() => setMenuOpen(false)}
        >
          {navLinks.map((link) => {
            const isExternal = link.href.startsWith("http");
            const className = `nav-link ${
              isActive(link.match) ? "is-active" : ""
            }`;

            return isExternal ? (
              <a
                className={className}
                href={link.href}
                key={link.label}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <Link className={className} href={link.href} key={link.label}>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
