import Image from "next/image";
import styles from "./robot-assistant.module.css";

export type RobotState = "idle" | "hover" | "answering" | "answering-rest" | "wave";

// Match the visible character height and baseline, not the PNG's transparent canvas.
const artwork = {
  wave: {"width":1232,"height":1277,"x":129,"y":87,"bodyWidth":944,"bodyHeight":1091},
  idle: { width: 1224, height: 1285, x: 199, y: 151, bodyWidth: 827, bodyHeight: 967 },
  hover: { width: 1301, height: 1209, x: 256, y: 143, bodyWidth: 788, bodyHeight: 946 },
  "answering-rest": {"width":1360,"height":1157,"x":259,"y":111,"bodyWidth":831,"bodyHeight":948},
  answering: { width: 1374, height: 1145, x: 347, y: 213, bodyWidth: 680, bodyHeight: 782 },
};

export function RobotCharacter({ state, small = false, poses = ["idle", "hover", "answering", "answering-rest"] }: { state: RobotState; small?: boolean; poses?: readonly RobotState[] }) {
  return (
    <span className={`${styles.character} ${small ? styles.smallCharacter : ""}`} data-state={state} aria-hidden="true">
      {poses.map((pose) => {
        const art = artwork[pose];
        const heightScale = 0.72 / art.bodyHeight;
        const widthScale = heightScale * (small ? 44 / 40 : 124 / 112);
        return (
        <Image
          key={pose}
          src={`/robot/robot-${pose}.png`}
          alt=""
          width={art.width}
          height={art.height}
          style={{
            width: `${art.width * widthScale * 100}%`,
            height: `${art.height * heightScale * 100}%`,
            left: `${50 - (art.x + art.bodyWidth / 2) * widthScale * 100}%`,
            top: `${14 - art.y * heightScale * 100}%`,
          }}
          sizes={small ? "40px" : "112px"}
          loading="eager"
          className={`${styles.sprite} ${state === pose ? styles.visibleSprite : ""}`}
          draggable={false}
        />
        );
      })}
    </span>
  );
}
