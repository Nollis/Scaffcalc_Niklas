import { PivotControls as PivotControlsDrei } from "@react-three/drei";
import PivotControlsProps from "./PivotControls.types";

const PivotControls = (props: PivotControlsProps) => {
  return <PivotControlsDrei {...props} />;
};

export default PivotControls;
