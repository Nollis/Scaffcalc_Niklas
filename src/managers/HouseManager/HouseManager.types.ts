import { Object3D, Vector3Tuple } from "three";

interface House {
  points: [Vector3Tuple, Vector3Tuple, Vector3Tuple, Vector3Tuple];
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  height?: number;
}

interface HouseManagerProps {
  houses: House[];
  onClickHousePointObject?: (point: Object3D, houseObject: Object3D) => void;
}

export type { House };
export default HouseManagerProps;
