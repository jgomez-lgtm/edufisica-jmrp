import React from "react";
import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, SCHOOL_NAME, VIDEO_TITLE, seededRandom } from "./palette";

/** Cortinilla final con el nombre del video y del colegio. */
export const TitleCard: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();

  const bgIn = spring({ frame, fps, config: { damping: 200 } });
  const titleIn = spring({ frame: frame - 6, fps, config: { damping: 12 } });
  const subtitleIn = spring({ frame: frame - 16, fps, config: { damping: 14 } });
  const badgeIn = spring({ frame: frame - 2, fps, config: { damping: 10 } });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 30%, ${COLORS.navy} 0%, ${COLORS.navyDark} 100%)`,
        opacity: interpolate(bgIn, [0, 1], [0, 1]),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* confeti estático de fondo */}
      {Array.from({ length: 24 }).map((_, i) => {
        const x = seededRandom(i * 1.1) * 1080;
        const y = seededRandom(i * 2.3) * 1920;
        const size = 10 + seededRandom(i * 3.7) * 14;
        const color = i % 2 === 0 ? COLORS.yellow : "#ffffff";
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: i % 3 === 0 ? "50%" : 4,
              background: color,
              opacity: 0.35,
              transform: `rotate(${seededRandom(i * 5.9) * 360}deg)`,
            }}
          />
        );
      })}

      {/* insignia con las iniciales del colegio */}
      <div
        style={{
          position: "absolute",
          top: 420,
          width: 170,
          height: 170,
          borderRadius: "50%",
          background: COLORS.yellow,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${interpolate(badgeIn, [0, 1], [0, 1])})`,
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        }}
      >
        <span style={{ fontFamily: "Georgia, serif", fontSize: 56, color: COLORS.navy, fontWeight: 700 }}>
          JMRP
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 700,
          width: "100%",
          textAlign: "center",
          padding: "0 60px",
          opacity: interpolate(titleIn, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleIn, [0, 1], [40, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "Arial Black, Arial, sans-serif",
            fontSize: 76,
            fontWeight: 900,
            color: COLORS.yellow,
            lineHeight: 1.1,
            textShadow: "0 6px 0 rgba(0,0,0,0.25)",
          }}
        >
          {VIDEO_TITLE}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 900,
          width: "100%",
          textAlign: "center",
          padding: "0 90px",
          opacity: interpolate(subtitleIn, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(subtitleIn, [0, 1], [30, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 40,
            color: "#ffffff",
            lineHeight: 1.4,
          }}
        >
          {SCHOOL_NAME}
        </span>
      </div>
    </AbsoluteFill>
  );
};
