// src/mocks/handlers.ts
import { http } from "msw";
import { getHousesGenerator } from "./endpoints";

export const handlers = [
  http.get("/api/houses", () => {
    const houses = getHousesGenerator();
    return new Response(JSON.stringify({ houses }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  })
];
