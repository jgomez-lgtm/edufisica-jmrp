// Fórmula de la "coreografía": una pose por golpe de ritmo (beat) que se
// repite cada 30 frames (1s), alternando lados y con un remate cada 4
// golpes (brazos arriba + salto), para que se sienta como pasos de baile
// y no solo un balanceo continuo.

export type DancePose = {
  armL: number; // grados
  armR: number; // grados
  jump: number; // px hacia arriba
  hipX: number; // px de balanceo de cadera
  tilt: number; // grados de inclinación del torso
  legSpread: number; // px
};

const BEAT_LEN = 30;

export const getDancePose = (localFrame: number, phase: number): DancePose => {
  const t = localFrame + phase;
  const beatIndex = Math.floor(t / BEAT_LEN);
  const beatT = (t % BEAT_LEN) / BEAT_LEN;
  const pop = Math.sin(Math.max(beatT, 0) * Math.PI); // 0 -> 1 -> 0 por golpe
  const mirror = beatIndex % 2 === 0 ? 1 : -1;
  const bigBeat = beatIndex % 4 === 3; // remate: ambos brazos arriba + salto

  const armL = bigBeat ? -20 - pop * 150 : -15 - pop * 70 * mirror;
  const armR = bigBeat ? 20 + pop * 150 : 15 + pop * 70 * -mirror;
  const jump = pop * (bigBeat ? 22 : 10);
  const hipX = Math.sin(t * 0.15) * 8 + mirror * pop * 6;
  const tilt = Math.sin(t * 0.15) * 5;
  const legSpread = 6 + pop * 6;

  return { armL, armR, jump, hipX, tilt, legSpread };
};

/** Suaviza la intensidad del baile en los primeros frames tras integrarse. */
export const rampIn = (framesSinceStart: number, rampFrames = 15) =>
  Math.min(1, Math.max(0, framesSinceStart / rampFrames));
