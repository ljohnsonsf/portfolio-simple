"use client";

import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudOff,
  CloudRain,
  CloudSnow,
  Sun,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type WeatherIcon = "sun" | "cloud" | "rain" | "snow" | "storm" | "fog" | "drizzle";

type WeatherResponse = {
  location: string;
  temperature: number | null;
  unit: "F";
  label: string;
  icon: WeatherIcon;
  observedAt: string | null;
  error: string | null;
};

const iconMap = {
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
  snow: CloudSnow,
  storm: CloudLightning,
  fog: CloudFog,
  drizzle: CloudDrizzle,
};

export function WeatherStatus() {
  const [now, setNow] = useState<Date | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 30_000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchWeather() {
      try {
        const response = await fetch("/api/weather");
        const data = (await response.json()) as WeatherResponse;

        if (!cancelled) {
          setWeather(data);
        }
      } catch {
        if (!cancelled) {
          setWeather({
            location: "New York, NY",
            temperature: null,
            unit: "F",
            label: "Weather unavailable",
            icon: "cloud",
            observedAt: null,
            error: "Weather unavailable",
          });
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchWeather();

    return () => {
      cancelled = true;
    };
  }, []);

  const formattedTime = useMemo(() => {
    if (!now) {
      return "--:--";
    }

    return new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "2-digit",
    }).format(now);
  }, [now]);

  const Icon = weather ? iconMap[weather.icon] : CloudOff;
  const temperature =
    weather?.temperature === null || weather?.temperature === undefined
      ? null
      : `${weather.temperature}°${weather.unit}`;

  return (
    <div className="weather-status" aria-live="polite">
      <span className="weather-item">
        <span className="status-dot" aria-hidden="true" />
        <span>New York, NY</span>
      </span>
      <span className="weather-item">{formattedTime}</span>
      <span className="weather-item">
        <span className="weather-icon" aria-hidden="true">
          <Icon size={16} strokeWidth={1.8} />
        </span>
        <span>
          {isLoading
            ? "Loading weather"
            : temperature
              ? `${temperature} ${weather?.label}`
              : weather?.label ?? "Weather unavailable"}
        </span>
      </span>
    </div>
  );
}
