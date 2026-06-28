"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/lib/profile";

const navLinks = [
  { href: "/", label: "Work", match: "work" },
  { href: "/about", label: "About", match: "about" },
  { href: profile.resumeUrl, label: "Resume", match: "resume" },
];

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
        <span className="avatar">
          <Image
            src="/avatar-photo.png"
            alt="Lauren Johnson"
            width={72}
            height={72}
            priority
          />
        </span>
        <span className="profile-text">
          <span className="profile-name">{profile.name}</span>
          <span className="profile-detail block">{profile.title}</span>
          <span className="profile-detail block">{profile.education}</span>
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
