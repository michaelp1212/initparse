import { readFileSync } from "fs";
import parser from "../parser.js";

const html = readFileSync(
  "src/js/background/bloomingdales/theory-solid-slim-fit-dress-shirt.html",
  "utf-8"
);

describe("bloomingdales", () => {
  test("definition", async () => {
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(html, "text/html");

    const data = await parser("www.bloomingdales.com", doc);
    expect(data).toBeTruthy();
  });
});
