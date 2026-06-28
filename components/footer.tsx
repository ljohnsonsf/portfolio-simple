import { WeatherStatus } from "@/components/weather-status";
import { profile } from "@/lib/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-panel">
        <p>
          Built with NextJS, React, Codex, Figma,
          <br />+ <em>a love of the game</em>
        </p>
        <nav className="footer-links" aria-label="Footer links">
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
            Resume
          </a>
        </nav>
      </div>
      <div className="status-row">
        <WeatherStatus />
      </div>
    </footer>
  );
}
