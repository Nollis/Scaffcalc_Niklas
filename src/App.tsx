import {
  Matrix4,
  Object3D,
  Quaternion,
  Vector3,
  Vector3Tuple,
} from "three";
import { useState, useEffect } from "react";
import { House } from "managers/HouseManager/HouseManager.types";
import AxesHelper from "components/AxesHelper";
import CameraControls from "components/CameraControls";
import Canvas from "components/Canvas";
import Container from "components/Container";
import GridHelper from "components/GridHelper";
import HouseManager from "managers/HouseManager";
import Light from "components/Light";
import PivotControls from "components/PivotControls";

/** Constants */
const CAMERA_POSITION = [10, 10, 10] as Vector3Tuple;
const GRID_POSITION = [0, -0.001, 0] as Vector3Tuple;
const GRID_SIZE = 50;
const CONTAINER_STYLE = {
  width: "100vw",
  height: "100vh",
  backgroundColor: "#151d2c",
};

const HOUSE_INIT: House = {
  id: "house-init",
  points: [
    [0, 0, 0],
    [2, 0, 0],
    [20, 0, 2],
    [0, 0, 2],
  ],
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  height: 2,
  userData: { id: "house-init" },
};

const PIVOT_DEFAULT_PROPS = {
  autoTransform: false,
  depthTest: false,
  fixed: true,
  scale: 60,
  disableScaling: true,
  disableSliders: true,
};

/** Variables */
const pivotMatrix = new Matrix4();

/** App */
const App = () => {
  /** States */
  const [houses, setHouses] = useState<House[]>([HOUSE_INIT]);
  const [enabledCameraControls, setEnabledCameraControls] = useState(true);
  const [selectedHouseObject, setSelectedHouseObject] = useState<Object3D>();
  const [selectedPointObject, setSelectedPointObject] = useState<Object3D>();

  /** Effect to update the pivot matrix based on the selected point */
  useEffect(() => {
    if (selectedPointObject) {
      //console.log("Updating pivot matrix based on selected point object");
      pivotMatrix.identity().copy(selectedPointObject.matrixWorld);
      //console.log("Pivot Matrix after selection: ", pivotMatrix.elements);
    }
  }, [selectedPointObject]);

  /** Callbacks */
  const handleOnClickHousePointObject = (
    pointObject: Object3D,
    houseObject: Object3D
  ) => {
    //console.log("Selected House Object:", houseObject);
    //console.log("Selected Point Object:", pointObject);

    setSelectedPointObject(pointObject);
    setSelectedHouseObject(houseObject);

    //console.log("Initial house object position: ", houseObject.position);
    //console.log("Initial house object rotation: ", houseObject.rotation);
  };

  const handleOnDragPivotControls = (matrix: Matrix4) => {
    pivotMatrix.copy(matrix);

    if (!selectedHouseObject || !selectedPointObject) {
      return;
    }

    // Extract position, rotation, and scale from the matrix
    const position = new Vector3();
    const quaternion = new Quaternion();
    const scale = new Vector3();
    matrix.decompose(position, quaternion, scale);

    // Calculate the position difference
    const pointPosition = new Vector3();
    selectedPointObject.getWorldPosition(pointPosition);
    const positionDelta = new Vector3().subVectors(position, pointPosition);

    // Apply position difference to house
    selectedHouseObject.position.add(positionDelta);

    // Apply rotation
    const initialQuaternion = new Quaternion();
    selectedPointObject.getWorldQuaternion(initialQuaternion);

    // Calculate the rotation delta
    const deltaQuaternion = quaternion.multiply(initialQuaternion.invert());

    // Apply the delta quaternion to the house
    selectedHouseObject.quaternion.premultiply(deltaQuaternion);

    // Update house state for the selected object
    const newHouseData = {
      position: [selectedHouseObject.position.x, selectedHouseObject.position.y, selectedHouseObject.position.z] as Vector3Tuple,
      rotation: selectedHouseObject.rotation.toArray() as Vector3Tuple,
    };

    setHouses((prevHouses) =>
      prevHouses.map((house) =>
        house.id === selectedHouseObject.userData.id
          ? { ...house, ...newHouseData }
          : house
      )
    );

    //console.log("Updated house object position during drag: ", selectedHouseObject.position);
    //console.log("Updated house object rotation during drag: ", selectedHouseObject.rotation);
    //console.log("Pivot Matrix during drag: ", pivotMatrix.elements);
  };

  const handleOnDragStartPivotControls = () => {
    setEnabledCameraControls(false);

    if (selectedPointObject) {
      // Copy the current world matrix of the selected point to the pivotMatrix
      pivotMatrix.copy(selectedPointObject.matrixWorld);
      //console.log("Drag start - pivot matrix set to:", pivotMatrix);
    }
  };

  const handleOnDragEndPivotControls = () => {
    setEnabledCameraControls(true);
    //console.log("Drag ended");
  };

  const handleOnClickGetHousesFromAPI = () => {
    console.log("Fetching houses...");
    fetch("/api/houses")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Check if the response is JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          throw new Error("Received non-JSON response");
        }
      })
      .then((data) => {
        console.log("Fetched houses:", data);
        setHouses(data.houses);
      })
      .catch((error) => {
        console.error("Error fetching houses:", error);
      });
  };  

  /** Render House List */
  const renderHouseList = () => (
    <div style={{ position: "absolute", left: 20, top: 20, color: "white" }}>
      <h2>Current Houses</h2>
      <ul>
        {houses.map((house, index) => (
          <li key={index}>
            <strong>House {index + 1}</strong>
            <br />
            Position: {house.position.join(", ")}
            <br />
            Rotation: {house.rotation.join(", ")}
            <br />
            Height: {house.height}m
          </li>
        ))}
      </ul>
    </div>
  );

  /** Return */
  return (
    <Container style={CONTAINER_STYLE}>
      <Canvas camera={{ position: CAMERA_POSITION }}>
        <AxesHelper />
        <CameraControls enabled={enabledCameraControls} />
        <GridHelper position={GRID_POSITION} args={[GRID_SIZE, GRID_SIZE]} />
        <HouseManager
          houses={houses}
          onClickHousePointObject={handleOnClickHousePointObject}
        />
        <Light />
        <PivotControls
          {...PIVOT_DEFAULT_PROPS}
          enabled={!!selectedHouseObject}
          matrix={pivotMatrix}
          onDragStart={handleOnDragStartPivotControls}
          onDrag={handleOnDragPivotControls}
          onDragEnd={handleOnDragEndPivotControls}
        />
      </Canvas>
      <button
        style={{ position: "absolute", right: 20, top: 20, height: "40px" }}
        onClick={handleOnClickGetHousesFromAPI}
      >
        GET Houses from API
      </button>
      {renderHouseList()}
    </Container>
  );
};

export default App;
