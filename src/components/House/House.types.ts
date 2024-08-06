import { Object3D } from "three";
import { House } from "../../managers/HouseManager/HouseManager.types";

interface HouseProps extends House {
  onClickHousePointObject?: (pointObject: Object3D) => void;
}

export default HouseProps;
