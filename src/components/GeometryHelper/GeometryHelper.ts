// src/utils/shapeUtils.ts

import { Vector3Tuple } from "three";

// Utility function to generate a random number within a range
export const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

// Utility function to generate random points within a grid
export const generateRandomPoint = (): Vector3Tuple => [
  getRandom(0, 20), // x-axis
  0,                // y-axis fixed at 0
  getRandom(0, 20)  // z-axis
];

// Utility function to calculate the cross product of two vectors
const crossProductZ = (a: Vector3Tuple, b: Vector3Tuple, c: Vector3Tuple): number => {
  const abx = b[0] - a[0];
  const aby = b[2] - a[2];
  const bcx = c[0] - b[0];
  const bcy = c[2] - b[2];
  return abx * bcy - aby * bcx;
};

// Utility function to generate a convex shape using the convex hull approach
const generateConvexHull = (points: Vector3Tuple[]): Vector3Tuple[] => {
  // Sort points by x, then by z
  points.sort((a, b) => a[0] === b[0] ? a[2] - b[2] : a[0] - b[0]);

  const lower: Vector3Tuple[] = [];
  for (const point of points) {
    while (lower.length >= 2 && crossProductZ(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
      lower.pop();
    }
    lower.push(point);
  }

  const upper: Vector3Tuple[] = [];
  for (let i = points.length - 1; i >= 0; i--) {
    const point = points[i];
    while (upper.length >= 2 && crossProductZ(upper[upper.length - 2], upper[upper.length - 1], point) <= 0) {
      upper.pop();
    }
    upper.push(point);
  }

  upper.pop();
  lower.pop();
  return lower.concat(upper);
};

// Function to generate a random convex shape with exactly 4 points
export const generateRandomConvexShape = (): [Vector3Tuple, Vector3Tuple, Vector3Tuple, Vector3Tuple] => {
  const points: Vector3Tuple[] = [];
  while (points.length < 10) {
    points.push(generateRandomPoint());
  }
  const convexHull = generateConvexHull(points);
  return convexHull.slice(0, 4) as [Vector3Tuple, Vector3Tuple, Vector3Tuple, Vector3Tuple];
};
