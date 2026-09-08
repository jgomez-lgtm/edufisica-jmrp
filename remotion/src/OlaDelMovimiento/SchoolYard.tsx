import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "./palette";

/** Fondo de la cancha del colegio: cielo, fachada, cancha y árboles. */
export const SchoolYard: React.FC<{ frame: number }> = ({ frame }) => {
  const cloudShift = (frame * 0.3) % 1200;

  return (
    <AbsoluteFill>
      {/* cielo */}
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: 900,
          background: `linear-gradient(180deg, ${COLORS.skyTop} 0%, ${COLORS.skyBottom} 100%)`,
        }}
      />

      {/* sol */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 90,
          width: 130,
          height: 130,
          borderRadius: "50%",
          background: COLORS.sun,
          boxShadow: `0 0 80px 30px ${COLORS.sun}55`,
        }}
      />

      {/* nubes */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 120 + i * 90,
            left: -260 + (((cloudShift + i * 400) % 1400) - 200),
            width: 180,
            height: 56,
            borderRadius: 999,
            background: "rgba(255,255,255,0.85)",
          }}
        />
      ))}

      {/* fachada del colegio */}
      <div
        style={{
          position: "absolute",
          top: 560,
          width: "100%",
          height: 220,
          background: COLORS.buildingWall,
          borderTop: `18px solid ${COLORS.buildingRoof}`,
        }}
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 40,
              left: 60 + i * 140,
              width: 90,
              height: 110,
              background: COLORS.buildingWallShade,
              border: "6px solid #fff",
              borderRadius: 4,
            }}
          />
        ))}
      </div>

      {/* árboles */}
      {[100, 940].map((x, i) => (
        <div key={i} style={{ position: "absolute", top: 620, left: x }}>
          <div
            style={{
              width: 20,
              height: 90,
              background: COLORS.treeTrunk,
              margin: "60px auto 0",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: -40,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: COLORS.treeGreenDark,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -20,
              left: -20,
              width: 110,
              height: 110,
              borderRadius: "50%",
              background: COLORS.treeGreen,
            }}
          />
        </div>
      ))}

      {/* cancha */}
      <div
        style={{
          position: "absolute",
          top: 780,
          width: "100%",
          height: 1140,
          background: `linear-gradient(180deg, ${COLORS.courtFloor} 0%, ${COLORS.courtFloorDark} 100%)`,
        }}
      >
        {/* línea central */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: 6,
            height: "100%",
            background: COLORS.courtLine,
            opacity: 0.8,
            transform: "translateX(-50%)",
          }}
        />
        {/* círculo central */}
        <div
          style={{
            position: "absolute",
            top: 380,
            left: "50%",
            width: 260,
            height: 260,
            border: `6px solid ${COLORS.courtLine}`,
            opacity: 0.8,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        {/* borde de cancha */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            border: `6px solid ${COLORS.courtLine}`,
            opacity: 0.6,
            borderRadius: 12,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
