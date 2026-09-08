import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { getDancePose, rampIn } from "./motion";

type BaseProps = {
  x: number;
  y: number; // punto de apoyo (pies) en px
  scale: number;
  skin: string;
  hair: string;
  shirt: string;
  bottom: string;
  phase: number;
  accessory?: "glasses" | "tie";
};

type SitProps = BaseProps & {
  mode: "sit";
  frame: number;
};

type DanceProps = BaseProps & {
  mode: "dance";
  frame: number; // frame local de la escena "cancha"
  joinFrame: number; // frame local en el que aparece este personaje
};

type CharacterProps = SitProps | DanceProps;

const Head: React.FC<{ skin: string; hair: string; accessory?: "glasses" | "tie" }> = ({
  skin,
  hair,
  accessory,
}) => (
  <div style={{ position: "absolute", top: -34, left: "50%", transform: "translateX(-50%)" }}>
    {/* pelo (detrás) */}
    <div
      style={{
        position: "absolute",
        top: -6,
        left: -3,
        width: 36,
        height: 24,
        borderRadius: "18px 18px 0 0",
        background: hair,
      }}
    />
    {/* cabeza */}
    <div
      style={{
        position: "relative",
        width: 30,
        height: 30,
        borderRadius: "50%",
        background: skin,
      }}
    />
    {accessory === "glasses" && (
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 2,
          width: 26,
          height: 8,
          borderRadius: 4,
          border: "2px solid #222",
          background: "rgba(255,255,255,0.15)",
        }}
      />
    )}
  </div>
);

const Arm: React.FC<{ side: "L" | "R"; angle: number; shirt: string; skin: string }> = ({
  side,
  angle,
  shirt,
  skin,
}) => (
  <div
    style={{
      position: "absolute",
      top: -6,
      [side === "L" ? "left" : "right"]: -9,
      width: 11,
      height: 38,
      transformOrigin: "50% 4px",
      transform: `rotate(${side === "L" ? -angle : angle}deg)`,
    }}
  >
    <div style={{ width: 11, height: 26, borderRadius: 6, background: shirt }} />
    <div
      style={{
        width: 11,
        height: 11,
        borderRadius: "50%",
        background: skin,
        marginTop: 1,
      }}
    />
  </div>
);

const Legs: React.FC<{ spread: number; bottom: string }> = ({ spread, bottom }) => (
  <div style={{ position: "absolute", top: 44, left: "50%", transform: "translateX(-50%)" }}>
    <div
      style={{
        position: "absolute",
        top: 0,
        left: -spread - 7,
        width: 13,
        height: 36,
        borderRadius: 5,
        background: bottom,
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: spread - 6,
        width: 13,
        height: 36,
        borderRadius: 5,
        background: bottom,
      }}
    />
  </div>
);

export const Character: React.FC<CharacterProps> = (props) => {
  const { fps } = useVideoConfig();
  const { x, y, scale, skin, hair, shirt, bottom, phase, accessory } = props;

  if (props.mode === "sit") {
    // Escena del salón: quietos, con una respiración muy sutil.
    const idleY = Math.sin((props.frame + phase) * 0.05) * 1.5;
    return (
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          transform: `translate(-50%, -100%) scale(${scale}) translateY(${idleY}px)`,
        }}
      >
        <div style={{ position: "relative", width: 40, height: 60 }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 40,
              height: 50,
              borderRadius: 12,
              background: shirt,
            }}
          />
          <Arm side="L" angle={4} shirt={shirt} skin={skin} />
          <Arm side="R" angle={4} shirt={shirt} skin={skin} />
          <Head skin={skin} hair={hair} accessory={accessory} />
        </div>
      </div>
    );
  }

  const { frame, joinFrame } = props;
  if (frame < joinFrame) return null;

  const sinceJoin = frame - joinFrame;
  const appear = spring({
    frame: sinceJoin,
    fps,
    config: { damping: 12, mass: 0.6 },
  });
  const entranceScale = interpolate(appear, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const entranceY = interpolate(appear, [0, 1], [55, 0], {
    extrapolateRight: "clamp",
  });

  const intensity = rampIn(sinceJoin);
  const pose = getDancePose(sinceJoin, phase);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -100%) translateY(${entranceY}px) scale(${
          scale * entranceScale
        })`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 44,
          height: 90,
          transform: `translate(${pose.hipX * intensity}px, ${-pose.jump * intensity}px) rotate(${
            pose.tilt * intensity
          }deg)`,
        }}
      >
        <Legs spread={pose.legSpread * intensity} bottom={bottom} />
        <div
          style={{
            position: "absolute",
            top: -4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 40,
            height: 50,
            borderRadius: 12,
            background: shirt,
          }}
        >
          {accessory === "tie" && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: 8,
                height: 26,
                background: "#c0392b",
                transform: "translateX(-50%)",
                clipPath: "polygon(50% 100%, 0 0, 100% 0)",
              }}
            />
          )}
        </div>
        <Arm side="L" angle={pose.armL * intensity} shirt={shirt} skin={skin} />
        <Arm side="R" angle={pose.armR * intensity} shirt={shirt} skin={skin} />
        <Head skin={skin} hair={hair} accessory={accessory} />
      </div>
      {/* sombra en el piso, se achica cuando el personaje salta */}
      <div
        style={{
          position: "absolute",
          bottom: -6,
          left: "50%",
          width: 34 - pose.jump * intensity * 0.6,
          height: 8,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.25)",
          transform: "translateX(-50%)",
          filter: "blur(1px)",
        }}
      />
    </div>
  );
};
