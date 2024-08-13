import House from "../../components/House";
import HouseManagerProps from "./HouseManager.types";

const HouseManager = (props: HouseManagerProps) => {
  const { houses, onClickHousePointObject } = props;

  return (
    <group name="Houses">
      {houses.map((house) => (
        <House
          key={house.id} // Use unique id as key
          {...house}
          onClickHousePointObject={onClickHousePointObject} // Pass the callback directly
        />
      ))}
    </group>
  );
};

export default HouseManager;
