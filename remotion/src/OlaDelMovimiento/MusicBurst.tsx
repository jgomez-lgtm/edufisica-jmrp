import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { COLORS, seededRandom } from "./palette";

// Dibujamos la corchea con CSS en vez de usar el emoji 🎵: así se ve
// igual en cualquier máquina, sin depender de que haya una fuente de
// emoji a color instalada donde se renderice el video.
const Note: React.FC<{ color: string }> = ({ color }) => (
  <div style={{ position: "relative", width: 30, height: 42 }}>
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 15,
        height: 11,
        borderRadius: "50%",
        background: color,
        transform: "rotate(-16deg)",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: 5,
        left: 13,
        width: 4,
        height: 36,
        background: color,
        borderRadius: 2,
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 17,
        width: 13,
        height: 12,
        borderRadius: "0 12px 8px 0",
        background: color,
      }}
    />
  </div>
);

const NOTE_COLORS = [
  COLORS.yellow,
  "#ffffff",
  COLORS.yellow,
  "#ffffff",
  COLORS.yellow,
  "#ffffff",
  COLORS.yellow,
  "#ffffff",
];

/** Escena de transición: el momento exacto en que "suena la música". */
export const MusicBurst: React.FC<{ frame: number; durationInFrames: number }> = ({
  frame,
  durationInFrames,
}) => {
  const flash = interpolate(frame, [0, 4, 16], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringScale = interpolate(frame, [0, durationInFrames], [0.2, 3.2], {
    extrapolateRight: "clamp",
  });
  const ringOpacity = interpolate(frame, [0, 6, durationInFrames], [0, 0.9, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.navy, overflow: "hidden" }}>
      {/* anillo de energía expandiéndose desde el centro */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          border: `10px solid ${COLORS.yellow}`,
          opacity: ringOpacity,
          transform: `translate(-50%, -50%) scale(${ringScale})`,
        }}
      />

      {/* notas musicales saliendo disparadas */}
      {NOTE_COLORS.map((color, i) => {
        const angle = (i / NOTE_COLORS.length) * Math.PI * 2 + seededRandom(i) * 0.4;
        const dist = interpolate(frame, [0, durationInFrames], [0, 620]);
        const nx = Math.cos(angle) * dist;
        const ny = Math.sin(angle) * dist;
        const op = interpolate(frame, [0, 6, durationInFrames], [0, 1, 0], {
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              opacity: op,
              transform: `translate(${nx - 15}px, ${ny - 21}px) rotate(${frame * 6}deg)`,
            }}
          >
            <Note color={color} />
          </div>
        );
      })}

      {/* flash blanco del golpe de música */}
      <AbsoluteFill style={{ background: "#ffffff", opacity: flash * 0.9 }} />
    </AbsoluteFill>
  );
};
