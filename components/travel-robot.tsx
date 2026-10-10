import Image from "next/image";
import styles from "./travel-robot.module.css";

const frames = [
  { width: 1235, height: 1274, x: 67, y: 105, bodyWidth: 1036, bodyHeight: 1069 },
  { width: 1199, height: 1312, x: 131, y: 86, bodyWidth: 916, bodyHeight: 1062 },
];

export function TravelRobot() {
  return (
    <span className={styles.robot} role="img" aria-label="Pixel robot walking with a suitcase">
      {frames.map((frame, index) => {
        // Match the visible height and baseline despite different canvas padding.
        const scaleY = 0.9 / frame.bodyHeight;
        const scaleX = scaleY * 1.2;
        return (
          <Image
            key={index}
            src={`/robot/travel-${index + 1}.png`}
            alt=""
            aria-hidden="true"
            width={frame.width}
            height={frame.height}
            sizes="160px"
            loading="eager"
            draggable={false}
            className={styles.frame}
            style={{
              width: `${frame.width * scaleX * 100}%`,
              height: `${frame.height * scaleY * 100}%`,
              left: `${50 - (frame.x + frame.bodyWidth / 2) * scaleX * 100}%`,
              top: `${5 - frame.y * scaleY * 100}%`,
            }}
          />
        );
      })}
    </span>
  );
}
