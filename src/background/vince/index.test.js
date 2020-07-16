import { readFileSync } from "fs";
import parser from "../parser.js";

const html = readFileSync(
  "src/js/background/vince/textured-v-neck-dress.html",
  "utf-8"
);

describe("vince", () => {
  test("definition", async () => {
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(html, "text/html");

    const data = await parser("www.vince.com", doc);
    expect(data).toBeTruthy();
  });
});
