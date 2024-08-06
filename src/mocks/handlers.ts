import { http, HttpResponse } from "msw";
import { getHousesGenerator } from "./endpoints";

export const handlers = [
  http.get("https://scaffcalc.com/api/houses", () => {
    return HttpResponse.json({ houses: getHousesGenerator() });
  })
];
