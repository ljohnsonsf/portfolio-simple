import { NextResponse } from "next/server";

type WeatherIcon = "sun" | "cloud" | "rain" | "snow" | "storm" | "fog" | "drizzle";

type WeatherState = {
  label: string;
  icon: WeatherIcon;
};

type OpenMeteoResponse = {
  current?: {
    temperature_2m?: number;
    weather_code?: number;
    time?: string;
  };
};

const weatherCodes = new Map<number, WeatherState>([
  [0, { label: "Clear sky", icon: "sun" }],
  [1, { label: "Mainly clear", icon: "sun" }],
  [2, { label: "Partly cloudy", icon: "cloud" }],
  [3, { label: "Overcast", icon: "cloud" }],
  [45, { label: "Fog", icon: "fog" }],
  [48, { label: "Rime fog", icon: "fog" }],
  [51, { label: "Light drizzle", icon: "drizzle" }],
  [53, { label: "Drizzle", icon: "drizzle" }],
  [55, { label: "Heavy drizzle", icon: "drizzle" }],
  [61, { label: "Light rain", icon: "rain" }],
  [63, { label: "Rain", icon: "rain" }],
  [65, { label: "Heavy rain", icon: "rain" }],
  [71, { label: "Light snow", icon: "snow" }],
  [73, { label: "Snow", icon: "snow" }],
  [75, { label: "Heavy snow", icon: "snow" }],
  [80, { label: "Rain showers", icon: "rain" }],
  [81, { label: "Rain showers", icon: "rain" }],
  [82, { label: "Heavy showers", icon: "rain" }],
  [95, { label: "Thunderstorm", icon: "storm" }],
  [96, { label: "Thunderstorm", icon: "storm" }],
  [99, { label: "Thunderstorm", icon: "storm" }],
]);

const fallbackState: WeatherState = {
  label: "Weather unavailable",
  icon: "cloud",
};

export async function GET() {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America%2FNew_York";

  try {
    const response = await fetch(url, {
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      throw new Error("Weather request failed");
    }

    const data = (await response.json()) as OpenMeteoResponse;
    const current = data.current;
    const code = current?.weather_code;
    const temperature = current?.temperature_2m;
    const state =
      typeof code === "number" ? weatherCodes.get(code) ?? fallbackState : fallbackState;

    return NextResponse.json({
      location: "New York, NY",
      temperature:
        typeof temperature === "number" ? Math.round(temperature) : null,
      unit: "F",
      label: state.label,
      icon: state.icon,
      observedAt: current?.time ?? null,
      error: null,
    });
  } catch {
    return NextResponse.json({
      location: "New York, NY",
      temperature: null,
      unit: "F",
      label: fallbackState.label,
      icon: fallbackState.icon,
      observedAt: null,
      error: "Weather unavailable",
    });
  }
}
