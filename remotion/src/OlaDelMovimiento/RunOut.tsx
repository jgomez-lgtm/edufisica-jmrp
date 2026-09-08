import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { Classroom } from "./Classroom";
import { SchoolYard } from "./SchoolYard";
import { Crowd } from "./Crowd";

/**
 * Transición: el salón se desvanece mientras la cancha aparece debajo,
 * con una barra de luz que "barre" la pantalla para vender el corte.
 */
export const RunOut: React.FC<{
  frame: number;
  durationInFrames: number;
  classroomFrame: number;
  canchaFrame: number;
}> = ({ frame, durationInFrames, classroomFrame, canchaFrame }) => {
  const classroomOpacity = interpolate(frame, [0, durationInFrames * 0.6], [1, 0], {
    extrapolateRight: "clamp",
  });
  const classroomScale = interpolate(frame, [0, durationInFrames], [1, 1.15], {
    extrapolateRight: "clamp",
  });
  const yardOpacity = interpolate(
    frame,
    [durationInFrames * 0.35, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp" },
  );
  const wipeX = interpolate(frame, [0, durationInFrames], [-200, 1400]);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: yardOpacity }}>
        <SchoolYard frame={canchaFrame} />
        <Crowd frame={canchaFrame} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          opacity: classroomOpacity,
          transform: `scale(${classroomScale})`,
        }}
      >
        <Classroom frame={classroomFrame} />
      </AbsoluteFill>

      {/* barra de luz diagonal */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: wipeX,
          width: 140,
          height: 2400,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 100%)",
          transform: "rotate(18deg)",
        }}
      />
    </AbsoluteFill>
  );
};
