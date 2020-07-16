import * as h from "./helpers";

describe("toDecimal", () => {
  it("returns a decimal value from $55.00", () => {
    expect(h.toDecimal("$55.00")).toBe(55.0);
  });
});
