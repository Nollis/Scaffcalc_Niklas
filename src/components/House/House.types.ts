import { Object3D, Vector3Tuple } from "three";

interface House {
  id: string;
  points: [Vector3Tuple, Vector3Tuple, Vector3Tuple, Vector3Tuple];
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  height: number; // Ensure height is required in the House interface
  userData?: { id: string };
}

interface HouseProps {
  id: string;
  points: [Vector3Tuple, Vector3Tuple, Vector3Tuple, Vector3Tuple];
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  height?: number; // Make height optional here if needed
  onClickHousePointObject?: (pointObject: Object3D, houseObject: Object3D) => void;
}

export type { House, HouseProps };
