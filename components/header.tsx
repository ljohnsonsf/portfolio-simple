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
  "M.S Human-Computer Interaction",
];

const typewriterTiming = {
  hold: 2000,
  type: 80,
  delete: 50,
  longDelete: 34,
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
      const deleteSpeed =
        currentPhrase === "M.S Human-Computer Interaction"
          ? typewriterTiming.longDelete
          : typewriterTiming.delete;

      timeout = window.setTimeout(() => {
        if (visibleText.length > 0) {
          setVisibleText((text) => text.slice(0, -1));
          return;
        }

        setPhraseIndex((index) => (index + 1) % typewriterPhrases.length);
        setPhase("typing");
      }, deleteSpeed);
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

  const isActive = (match: string) => {
    if (match === "work") {
      return pathname === "/" || pathname === "/work";
    }

    return pathname.startsWith(`/${match}`);
  };

  return (
    <header className="site-header reveal-on-load reveal-on-load--header">
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
