// Colores y utilidades compartidas por toda la escena "La Ola del Movimiento".

export const SCHOOL_NAME = "Institución Educativa Jesús María Rojas Pagola";
export const VIDEO_TITLE = "¡La Ola del Movimiento!";

export const FPS = 30;

// Duración de cada bloque narrativo (en frames, a 30 fps).
export const TIMING = {
  classroomStart: 0,
  classroomDuration: 90, // 0:00 - 0:03  Salón quieto
  burstStart: 90,
  burstDuration: 30, // 0:03 - 0:04  Suena la música
  runOutStart: 120,
  runOutDuration: 45, // 0:04 - 0:05.5 Salen corriendo a la cancha
  canchaStart: 165,
  canchaDuration: 525, // 0:05.5 - 0:23  Baile que va creciendo + cierre panorámico
  titleStart: 690,
  titleDuration: 60, // 0:23 - 0:25  Cortinilla final
};

export const TOTAL_DURATION =
  TIMING.titleStart + TIMING.titleDuration; // 750 frames = 25s

// Dentro del bloque "cancha", en qué frame local se integra cada grupo.
export const JOIN = {
  kids: 0,
  bachillerato: 120, // se unen ~4s después de llegar a la cancha
  profes: 270, // profes y directivos cierran la coreografía ~9s después
};

// Últimos frames del bloque cancha en los que la cámara se abre
// para mostrar a todo el colegio bailando junto.
export const FINALE_PULLBACK_START = TIMING.canchaDuration - 60;

/**
 * Generador pseudoaleatorio determinista: con la misma semilla siempre
 * da el mismo resultado. Usamos esto (en vez de Math.random()) porque
 * Remotion vuelve a renderizar el componente en cada frame — con
 * Math.random() el elenco "temblaría" de un frame a otro.
 */
export const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 999.234) * 43758.5453123;
  return x - Math.floor(x);
};

export const COLORS = {
  skyTop: "#57c1f0",
  skyBottom: "#fdf1c7",
  sun: "#ffd447",
  buildingWall: "#f4ede1",
  buildingWallShade: "#e2d7c2",
  buildingRoof: "#c0392b",
  courtFloor: "#e08a3f",
  courtFloorDark: "#cf7a30",
  courtLine: "#ffffff",
  treeGreen: "#2f7d4f",
  treeGreenDark: "#25623d",
  treeTrunk: "#6b4226",
  classroomWall: "#eef2fb",
  classroomWallLow: "#dbe4f5",
  classroomFloor: "#cdb896",
  deskWood: "#8a5a3b",
  deskWoodDark: "#734a30",
  board: "#25543f",
  navy: "#0b3d91",
  navyDark: "#082c6b",
  yellow: "#ffc60b",
  white: "#ffffff",
};

export const SKIN_TONES = [
  "#f1c27d",
  "#e0ac69",
  "#c68642",
  "#8d5524",
  "#ffdbac",
  "#d8a06a",
];

export const HAIR_COLORS = [
  "#241a14",
  "#3b2417",
  "#111111",
  "#5c3a21",
  "#1c1c1c",
  "#7a4b23",
];

export type CharacterSpec = {
  id: string;
  x: number;
  y: number;
  scale: number;
  skin: string;
  hair: string;
  shirt: string;
  bottom: string;
  phase: number;
  joinFrame: number;
  accessory?: "glasses" | "tie";
};

export type Group = "kids" | "bachillerato" | "profes";

const ROWS = [
  { y: 1120, scale: 0.5 },
  { y: 1260, scale: 0.62 },
  { y: 1400, scale: 0.75 },
  { y: 1560, scale: 0.9 },
  { y: 1740, scale: 1.05 },
];
const COLS = 6;
const X_MARGIN = 150;
const X_SPAN = 1080 - X_MARGIN * 2;

const slotPosition = (slot: number) => {
  const row = Math.floor(slot / COLS);
  const col = slot % COLS;
  const rowStagger = row % 2 === 0 ? 0 : X_SPAN / COLS / 2;
  const jitterX = (seededRandom(slot * 3.1) - 0.5) * 40;
  const jitterY = (seededRandom(slot * 7.7) - 0.5) * 20;
  const x = X_MARGIN + rowStagger + (col / (COLS - 1)) * X_SPAN + jitterX;
  const { y, scale } = ROWS[row];
  return { x, y: y + jitterY, scale };
};

const buildGroup = (
  slots: number[],
  group: Group,
  joinBase: number,
  shirt: (i: number) => string,
  bottom: (i: number) => string,
  accessory?: (i: number) => "glasses" | "tie" | undefined,
): CharacterSpec[] => {
  return slots.map((slot, i) => {
    const { x, y, scale } = slotPosition(slot);
    const col = slot % COLS;
    // La ola de entrada: los personajes de la izquierda se suman primero,
    // como una ola literal recorriendo la cancha de izquierda a derecha.
    const waveDelay = Math.round((col / (COLS - 1)) * 24 + seededRandom(slot) * 8);
    return {
      id: `${group}-${i}`,
      x,
      y,
      scale,
      skin: SKIN_TONES[Math.floor(seededRandom(slot * 1.5) * SKIN_TONES.length)],
      hair: HAIR_COLORS[Math.floor(seededRandom(slot * 2.5) * HAIR_COLORS.length)],
      shirt: shirt(i),
      bottom: bottom(i),
      phase: Math.floor(seededRandom(slot * 4.2) * 30),
      joinFrame: joinBase + waveDelay,
      accessory: accessory?.(i),
    };
  });
};

// Filas 1-3 (parcial): los niños de primaria, ya instalados cerca del
// centro de la cancha porque fueron los primeros en salir corriendo.
const KIDS_SLOTS = Array.from({ length: 14 }, (_, i) => i + 6);
// Cola de la fila 3 + fila 4: bachillerato llega después, más al frente.
const BACHILLERATO_SLOTS = Array.from({ length: 10 }, (_, i) => i + 20);
// Fila 0 (la más lejana): profes y directivos, que salen del colegio al final.
const PROFES_SLOTS = Array.from({ length: 6 }, (_, i) => i);

export const KIDS: CharacterSpec[] = buildGroup(
  KIDS_SLOTS,
  "kids",
  JOIN.kids,
  () => COLORS.white,
  (i) => (i % 3 === 0 ? "#1d3557" : COLORS.navy),
);

export const BACHILLERATO: CharacterSpec[] = buildGroup(
  BACHILLERATO_SLOTS,
  "bachillerato",
  JOIN.bachillerato,
  (i) => (i % 2 === 0 ? "#2a6f97" : "#1d3557"),
  () => "#22333b",
);

const PROFE_SHIRTS = ["#ffffff", "#c8a2c8", "#84a98c", "#f4a261", "#e76f51", "#a8dadc"];

export const PROFES: CharacterSpec[] = buildGroup(
  PROFES_SLOTS,
  "profes",
  JOIN.profes,
  (i) => PROFE_SHIRTS[i % PROFE_SHIRTS.length],
  () => "#343a40",
  (i) => (i === 0 ? "tie" : i === 2 || i === 4 ? "glasses" : undefined),
);

// Los mismos 14 niños, pero sentados en el salón (escena inicial).
// Reutilizamos su apariencia para que sean "los mismos" personajes.
export const CLASSROOM_KIDS = KIDS.map((k, i) => {
  const row = i < 7 ? 0 : 1;
  const col = i % 7;
  return {
    ...k,
    deskX: 170 + col * 122,
    deskY: row === 0 ? 760 : 1040,
    deskScale: row === 0 ? 0.95 : 1.1,
  };
});
