import { Shape, Group } from "three";
import { useMemo } from "react";
import { HouseProps } from "./House.types";

const House = (props: HouseProps) => {
  const { position, rotation, points, height = 1, onClickHousePointObject, id } = props;

  // Memoized shape calculation based on points
  const shape = useMemo(() => {
    const shape = new Shape();
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const [x, _, z] = point;
      if (i === 0) {
        shape.moveTo(x, z);
      } else {
        shape.lineTo(x, z);
      }
    }
    shape.closePath(); // Ensure the shape is closed
    return shape;
  }, [points]);

  return (
    <group
      name="HouseGroup"
      position={position}
      rotation={rotation}
      userData={{ id }} // Attach userData with a unique id
    >
      {/* Ensure this mesh is positioned such that its base is at y=0 */}
      <mesh name="HouseBody" rotation-x={Math.PI / 2} position-y={height}>
        <extrudeGeometry
          attach="geometry"
          args={[shape, { depth: height, bevelEnabled: false }]}
        />
        <meshStandardMaterial attach="material" color="lightgreen" />
      </mesh>
      {points.map((point, index) => (
        <mesh
          key={index}
          position={[point[0], 0, point[2]]}
          onClick={(e) => {
            e.stopPropagation(); // Prevent event from bubbling up further
            const houseGroup = e.object.parent; // Directly use the parent
            if (onClickHousePointObject && houseGroup) {
              onClickHousePointObject(e.object, houseGroup);
            }
          }}
        >
          <sphereGeometry attach="geometry" args={[0.18, 16, 16]} />
          <meshStandardMaterial attach="material" color="white" depthTest={false} />
        </mesh>
      ))}
    </group>
  );
};

export default House;
