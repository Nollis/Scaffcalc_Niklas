import { CameraControls } from "@react-three/drei";
import { ComponentProps } from "react";

type CameraControlsPropsDrei = ComponentProps<typeof CameraControls>;

interface CameraControlsProps extends CameraControlsPropsDrei {}

export default CameraControlsProps;
