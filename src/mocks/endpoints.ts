import { House } from "managers/HouseManager/HouseManager.types";
import { Vector3Tuple } from "three";
import { generateRandomConvexShape, getRandom } from "../components/GeometryHelper/GeometryHelper"; // Adjust the path as needed


// Utility function to generate a random point within the grid
const generateRandomPoint = (): Vector3Tuple => [
  getRandom(0, 100), // x-axis
  0,                 // y-axis fixed at 0
  getRandom(0, 100)  // z-axis
];

export const getHousesGenerator: () => House[] = () => {
  console.log("Mock API called");
  const houseCount = Math.floor(Math.random() * 10) + 1; // Generate 1 to 10 houses
  const houses: House[] = [];

  for (let i = 0; i < houseCount; i++) {
    const points = generateRandomConvexShape();
    const position: Vector3Tuple = generateRandomPoint();
    const rotation: Vector3Tuple = [0, getRandom(0, Math.PI * 2), 0]; // Rotation around y-axis
    const height = getRandom(1, 20); // Height between 1 and 20 meters

    const house: House = {
      id: `house-${i}`, // Add a unique identifier
      points,
      position,
      rotation,
      height,
      userData: { id: `house-${i}` } // Include in userData for easy access
    };

    houses.push(house);
  }

  return houses;
};
