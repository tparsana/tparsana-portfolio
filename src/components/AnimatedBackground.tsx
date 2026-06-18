import Grainient from "./Grainient";

const AnimatedBackground = () => {
  return (
    <div className="viewport-background" aria-hidden="true">
      <Grainient
        color1="#98B5AF"
        color2="#1c373e"
        color3="#425d64"
        timeSpeed={0.5}
        colorBalance={0.0}
        warpStrength={1.0}
        warpFrequency={5.0}
        warpSpeed={2.0}
        warpAmplitude={50.0}
        blendAngle={0.0}
        blendSoftness={0.05}
        rotationAmount={500.0}
        noiseScale={2.0}
        grainAmount={0.05}
        grainScale={2.0}
        grainAnimated={false}
        contrast={1.5}
        gamma={1.0}
        saturation={1.0}
        centerX={0.0}
        centerY={0.0}
        zoom={0.9}
      />
    </div>
  );
};

export default AnimatedBackground;
