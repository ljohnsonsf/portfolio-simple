"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { RobotCharacter } from "./robot-character";
import styles from "./robot-assistant.module.css";

export function AboutRobot() {
  const [waving, setWaving] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let endWave: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setWaving(true);
      endWave = setTimeout(() => setWaving(false), 1400);
    }, 5000);
    return () => { clearInterval(interval); clearTimeout(endWave); };
  }, [reducedMotion]);

  return (
    <div className={styles.aboutRobot} role="img" aria-label="A little robot waving hello">
      <RobotCharacter state={!reducedMotion && waving ? "wave" : "idle"} poses={["idle", "wave"]} />
    </div>
  );
}
