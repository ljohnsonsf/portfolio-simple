"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/lib/profile";

const navLinks = [
  { href: "/", label: "Work", match: "work" },
  { href: "/about", label: "About", match: "about" },
  { href: profile.resumeUrl, label: "Resume", match: "resume" },
];

const typewriterPhrases = [
  "Product Designer",
  "UX Designer",
];

const typewriterTiming = {
  hold: 2000,
  type: 80,
  delete: 50,
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    setPrefersReducedMotion(query.matches);

    const handleChange = () => {
      setPrefersReducedMotion(query.matches);
    };

    query.addEventListener("change", handleChange);

    return () => {
      query.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

function TypewriterDetail() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visibleText, setVisibleText] = useState(typewriterPhrases[0]);
  const [phase, setPhase] = useState<"holding" | "typing" | "deleting">(
    "holding",
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleText(typewriterPhrases[0]);
      setPhraseIndex(0);
      setPhase("holding");
      return;
    }

    const currentPhrase = typewriterPhrases[phraseIndex];
    let timeout = typewriterTiming.hold;

    if (phase === "holding") {
      timeout = window.setTimeout(
        () => setPhase("deleting"),
        typewriterTiming.hold,
      );
    } else if (phase === "deleting") {
      timeout = window.setTimeout(() => {
        if (visibleText.length > 0) {
          setVisibleText((text) => text.slice(0, -1));
          return;
        }

        setPhraseIndex((index) => (index + 1) % typewriterPhrases.length);
        setPhase("typing");
      }, typewriterTiming.delete);
    } else if (phase === "typing") {
      timeout = window.setTimeout(() => {
        if (visibleText.length < currentPhrase.length) {
          setVisibleText(currentPhrase.slice(0, visibleText.length + 1));
          return;
        }

        setPhase("holding");
      }, typewriterTiming.type);
    }

    return () => {
      window.clearTimeout(timeout);
    };
  }, [phase, phraseIndex, prefersReducedMotion, visibleText]);

  return (
    <span className="profile-detail profile-typewriter">
      <span className="profile-typewriter__text">{visibleText}</span>
      <span className="profile-typewriter__cursor" aria-hidden="true" />
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
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
          <TypewriterDetail />
        </span>
          <span
            className={`profile-status${isCaseStudy ? " profile-status--hidden" : ""}`}
            aria-hidden={isCaseStudy}
            inert={isCaseStudy}
          >
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
            <span className="profile-status__line">
              M.S. HCI
              <span className="profile-status__separator"> · </span>
              Spring 2027
              <span className="profile-status__separator"> · </span>
              Seeking 2027 full-time product design roles
            </span>
          </span>
      </div>

      <div className="header-actions">
        <nav className="primary-nav" aria-label="Primary navigation">
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
