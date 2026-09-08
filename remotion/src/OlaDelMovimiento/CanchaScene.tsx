import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { SchoolYard } from "./SchoolYard";
import { Crowd } from "./Crowd";
import { FINALE_PULLBACK_START, TIMING } from "./palette";

/**
 * Escena de la cancha: arranca con los niños ya bailando, se van sumando
 * bachillerato y luego profes/directivos, y cierra con la cámara
 * abriéndose para mostrar a todo el colegio bailando junto.
 */
export const CanchaScene: React.FC<{ frame: number }> = ({ frame }) => {
  const cameraScale = interpolate(
    frame,
    [FINALE_PULLBACK_START, TIMING.canchaDuration],
    [1, 0.8],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const cameraY = interpolate(
    frame,
    [FINALE_PULLBACK_START, TIMING.canchaDuration],
    [0, -70],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill>
      {/* El fondo se queda a tamaño completo: si escalamos todo el
          AbsoluteFill (fondo incluido) aparece un marco negro alrededor
          al alejar la cámara, porque el fondo es una ilustración de
          tamaño fijo, no una escena más grande de la que "hay más para
          mostrar". Solo la multitud se aleja/reduce. */}
      <SchoolYard frame={frame} />
      <AbsoluteFill
        style={{
          transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
        }}
      >
        <Crowd frame={frame} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
