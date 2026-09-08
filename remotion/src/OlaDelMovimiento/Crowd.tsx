import React from "react";
import { KIDS, BACHILLERATO, PROFES } from "./palette";
import { Character } from "./Character";

/** Todo el colegio bailando: primero los niños, luego bachillerato, luego profes. */
export const Crowd: React.FC<{ frame: number }> = ({ frame }) => {
  const all = [...PROFES, ...BACHILLERATO, ...KIDS]; // orden de dibujo: fondo -> frente

  return (
    <>
      {all.map((c) => (
        <Character
          key={c.id}
          mode="dance"
          frame={frame}
          joinFrame={c.joinFrame}
          x={c.x}
          y={c.y}
          scale={c.scale}
          skin={c.skin}
          hair={c.hair}
          shirt={c.shirt}
          bottom={c.bottom}
          phase={c.phase}
          accessory={c.accessory}
        />
      ))}
    </>
  );
};
