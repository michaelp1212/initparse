import { readFileSync } from "fs";

import parser, {
  defaultPostFn,
  extract,
  getBrandDef,
  split
} from "./parser.js";

const html = readFileSync(
  "src/js/background/vince/textured-v-neck-dress.html",
  "utf-8"
);

// console.log(new DOMParser()
//   .parseFromString('<div id="yup">What the shit?! yes!</div>', 'text/html')
//   .querySelector('#yup')
//   .textContent)

// console.log(new JSDOM('<div id="yup">What the shit? yes!</div>')
//   .window
//   .document
//   .querySelector('#yup')
//   .textContent)

describe("getting brand definition", () => {
  test("gets brand product definition based on host", () => {
    const definition = getBrandDef("www.vince.com");
    expect(definition).toBeInstanceOf(Object);
  });

  test("throws unsupported when a brand host is not found", () => {
    expect(() => {
      getBrandDef("www.vinzclortho.com");
    }).toThrow();
  });
});

describe("splitting selectors and function", () => {
  test("into an array and function with only a selector", () => {
    const [sels, fn] = split(".blue");
    expect(sels).toEqual([".blue"]);
    expect(fn).toBeInstanceOf(Function);
  });

  test("into an array and function with only selectors", () => {
    const [sels, fn] = split([".blue", ".red"]);
    expect(sels).toEqual([".blue", ".red"]);
    expect(fn).toBeInstanceOf(Function);
  });

  test("into an array and a function with both", () => {
    const innerFn = el => el.innerText;
    const [sels, fn] = split([".blue", ".red", ".fuscia", ".hotpink", innerFn]);
    expect(sels).toEqual([".blue", ".red", ".fuscia", ".hotpink"]);
    expect(fn).toBe(innerFn);
  });
});

describe("extracting value", () => {
  const html = `
  <body>
    <div id="product">
      <div class="left">
        <div class="images">
        </div>
      </div>
      <div class="right">
        <div class="price">
          <em>$ 168.17</em>
        </div>
      </div>
    </div>
  </body>
  `;
  const parser = new DOMParser();
  const body = parser.parseFromString(html, "text/html");

  test("with a single selector", () => {
    const result = extract([".price"], defaultPostFn, body);
    expect(result).toBe("$ 168.17");
  });

  test("with more than one selector", () => {
    const result = extract(
      ["#price", ".promos .price", ".price"],
      defaultPostFn,
      body
    );
    expect(result).toBe("$ 168.17");
  });

  test("providing a function", () => {
    const result = extract(
      ["#price", ".promos .price", ".price"],
      s => parseFloat(2),
      body
    );
    expect(result).toBe(168.17);
  });
});

test.only("parser", async () => {
  const domparser = new DOMParser();
  const doc = domparser.parseFromString(html, "text/html");
  const data = await parser("www.vince.com", doc);
  expect(data).toBeTruthy();
});
