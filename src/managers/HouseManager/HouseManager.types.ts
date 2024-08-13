import { Object3D, Vector3Tuple } from "three";

interface House {
  id: string; // Add an id field for unique identification
  points: [Vector3Tuple, Vector3Tuple, Vector3Tuple, Vector3Tuple];
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  height?: number;
  userData?: { id: string }; // Optional userData field for additional metadata
}

interface HouseManagerProps {
  houses: House[];
  onClickHousePointObject?: (point: Object3D, houseObject: Object3D) => void;
}

export type { House };
export default HouseManagerProps;
