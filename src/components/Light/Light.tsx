import LightProps from "./Light.types";

const Light = (props: LightProps) => {
  return (
    <>
      <hemisphereLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[20, 100, 0]} />
    </>
  );
};

export default Light;
