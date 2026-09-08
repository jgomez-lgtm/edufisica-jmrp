import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { Classroom } from "./Classroom";
import { MusicBurst } from "./MusicBurst";
import { RunOut } from "./RunOut";
import { CanchaScene } from "./CanchaScene";
import { TitleCard } from "./TitleCard";
import { TIMING } from "./palette";

/**
 * "La Ola del Movimiento" — I.E. Jesús María Rojas Pagola
 *
 * Storyboard animado (personajes ilustrados, no video real) de la idea:
 * el salón está quieto, suena la música, los niños salen corriendo a la
 * cancha a bailar una coreografía, se van sumando bachillerato y, al
 * final, profes y directivos.
 *
 * Este archivo solo ordena las escenas en el tiempo; cada escena vive en
 * su propio componente (Classroom, MusicBurst, RunOut, CanchaScene,
 * TitleCard) para que sea fácil ajustar tiempos o reemplazar piezas más
 * adelante (por ejemplo, cambiar esta animación por video real cuando lo
 * tengan grabado).
 */
export const OlaDelMovimiento: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence from={TIMING.classroomStart} durationInFrames={TIMING.classroomDuration}>
        <Classroom frame={frame - TIMING.classroomStart} />
      </Sequence>

      <Sequence from={TIMING.burstStart} durationInFrames={TIMING.burstDuration}>
        <MusicBurst
          frame={frame - TIMING.burstStart}
          durationInFrames={TIMING.burstDuration}
        />
      </Sequence>

      <Sequence from={TIMING.runOutStart} durationInFrames={TIMING.runOutDuration}>
        <RunOut
          frame={frame - TIMING.runOutStart}
          durationInFrames={TIMING.runOutDuration}
          classroomFrame={frame - TIMING.classroomStart}
          canchaFrame={frame - TIMING.canchaStart}
        />
      </Sequence>

      <Sequence from={TIMING.canchaStart} durationInFrames={TIMING.canchaDuration}>
        <CanchaScene frame={frame - TIMING.canchaStart} />
      </Sequence>

      <Sequence from={TIMING.titleStart} durationInFrames={TIMING.titleDuration}>
        <TitleCard frame={frame - TIMING.titleStart} />
      </Sequence>
    </AbsoluteFill>
  );
};
