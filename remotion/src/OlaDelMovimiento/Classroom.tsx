import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, CLASSROOM_KIDS, SCHOOL_NAME } from "./palette";
import { Character } from "./Character";

/** Escena 1: el salón, quieto, antes de que suene la música. */
export const Classroom: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <AbsoluteFill style={{ background: COLORS.classroomWall }}>
      {/* pared baja */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 700,
          background: COLORS.classroomWallLow,
        }}
      />

      {/* tablero */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: "50%",
          transform: "translateX(-50%)",
          width: 640,
          height: 220,
          background: COLORS.board,
          borderRadius: 10,
          border: "10px solid #6b4226",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, serif",
            color: "#f4ede1",
            fontSize: 34,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          {SCHOOL_NAME}
        </span>
      </div>

      {/* reloj */}
      <div
        style={{
          position: "absolute",
          top: 100,
          right: 90,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#fff",
          border: "4px solid #333",
        }}
      />

      {/* ventanas */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 430,
            left: 60 + i * 340,
            width: 220,
            height: 160,
            background: "#bfe4f7",
            border: "8px solid #fff",
            borderRadius: 6,
          }}
        />
      ))}

      {/* piso */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 560,
          background: COLORS.classroomFloor,
        }}
      />

      {/* pupitres + niños */}
      {CLASSROOM_KIDS.map((kid) => (
        <React.Fragment key={kid.id}>
          <div
            style={{
              position: "absolute",
              left: kid.deskX,
              top: kid.deskY,
              width: 78 * kid.deskScale,
              height: 48 * kid.deskScale,
              background: COLORS.deskWood,
              border: `4px solid ${COLORS.deskWoodDark}`,
              borderRadius: 6,
              transform: "translate(-50%, 0)",
            }}
          />
          <Character
            mode="sit"
            frame={frame}
            x={kid.deskX}
            y={kid.deskY - 4}
            scale={kid.deskScale}
            skin={kid.skin}
            hair={kid.hair}
            shirt={kid.shirt}
            bottom={kid.bottom}
            phase={kid.phase}
          />
        </React.Fragment>
      ))}
    </AbsoluteFill>
  );
};
