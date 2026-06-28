"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const storageKey = "lauren-portfolio-theme";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";
  const visibleTheme = mounted ? theme : "light";

  const toggleTheme = () => {
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(storageKey, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={mounted && theme === "dark"}
      onClick={toggleTheme}
    >
      Mode: {visibleTheme === "dark" ? "Dark" : "Light"}
    </button>
  );
}
