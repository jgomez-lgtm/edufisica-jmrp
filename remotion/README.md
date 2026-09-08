# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## "La Ola del Movimiento" — I.E. Jesús María Rojas Pagola

La composición `OlaDelMovimiento` (`src/OlaDelMovimiento/`) es un **storyboard
animado** (personajes ilustrados en estilo plano, no video real) de 25s en
formato vertical 9:16 (1080×1920, pensado para TikTok/Reels/Estados) que
cuenta:

1. **El salón, quieto** (0:00–0:03) — niños sentados en sus pupitres.
2. **Suena la música** (0:03–0:04) — ráfaga de energía y notas musicales.
3. **Salen corriendo a la cancha** (0:04–0:05.5) — transición al patio.
4. **La coreografía crece** (0:05.5–0:21) — bailan primero los niños,
   luego se suma bachillerato y por último profes y directivos, cada
   grupo entrando "en ola" de izquierda a derecha.
5. **Toma panorámica final** (0:21–0:23) — la cámara se abre para mostrar
   a todo el colegio bailando junto.
6. **Cortinilla de cierre** (0:23–0:25) — título y nombre del colegio.

Cada escena vive en su propio archivo (`Classroom.tsx`, `MusicBurst.tsx`,
`RunOut.tsx`, `CanchaScene.tsx` + `Crowd.tsx`, `TitleCard.tsx`) y los
tiempos se controlan desde `palette.ts` (objeto `TIMING`). `Character.tsx`
es el personaje reutilizable (sentado o bailando) y `motion.ts` define la
fórmula de la coreografía.

**Próximos pasos para hacerlo realidad:**

- **Música real:** agrega el archivo (con licencia) en `public/`, por
  ejemplo `public/musica.mp3`, y en `src/OlaDelMovimiento/index.tsx`
  agrega `<Audio src={staticFile("musica.mp3")} startFrom={...} />` — hoy
  el proyecto no incluye audio porque no se puede usar una canción de
  TikTok con derechos de autor sin licencia.
- **Video/fotos reales:** cuando graben el evento en el colegio, esos
  clips pueden reemplazar o combinarse con esta animación usando
  `<OffthreadVideo>` / `<Img>` de Remotion.
- **Colores del colegio:** los colores azul/amarillo en `palette.ts`
  (`COLORS`) son un placeholder — cámbialos por los colores institucionales
  reales si son distintos.

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
