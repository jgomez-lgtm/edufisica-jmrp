import "./index.css";
import { Composition } from "remotion";
import { OlaDelMovimiento } from "./OlaDelMovimiento";
import { TOTAL_DURATION, FPS } from "./OlaDelMovimiento/palette";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="OlaDelMovimiento"
        component={OlaDelMovimiento}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
