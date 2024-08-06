import CameraControlsProps from "./CameraControls.types";
import { CameraControls as CameraControlsDrei } from "@react-three/drei";

const CameraControls = (props: CameraControlsProps) => {
  return <CameraControlsDrei {...props} />;
};

export default CameraControls;
