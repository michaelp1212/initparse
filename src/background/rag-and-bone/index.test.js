import { readFileSync } from "fs";
import parser from "../parser.js";

const html = readFileSync(
  "src/js/background/rag-and-bone/mens-classic-tee.html",
  "utf-8"
);

describe("rag and bone", () => {
  test("definition", async () => {
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(html, "text/html");

    const data = await parser("www.rag-bone.com", doc);
    expect(data).toBeTruthy();
  });
});
