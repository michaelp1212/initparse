import { add, empty, remove } from "./cart";

const jacket = { id: "2973", name: "Jacket" };
const shoes = { id: "6482W", name: "Shoes" };

test("adding a product", () => {
  const cart = { items: [] };
  const updated = add(cart, jacket, "L", "black");
  const { items } = updated;
  const [id, data] = items[0];

  expect(items).toHaveLength(1);
  expect(id).toMatch(/[0-9a-f-]{36}/);
  expect(data.product).toBe(jacket);
  expect(data.size).toBe("L");
  expect(data.color).toBe("black");
});

test("emptying a cart", () => {
  const cart = { items: [jacket, shoes] };
  expect(empty(cart)).toHaveProperty("items", []);
});

test("removing a product", () => {
  const cart = {
    items: [
      ["1a", { product: jacket }],
      ["2b", { product: shoes }]
    ]
  };

  const updated = remove(cart, "1a");
  const { items } = updated;
  const [id, data] = items[0];

  expect(items).toHaveLength(1);
  expect(id).toBe("2b");
  expect(data.product).toBe(shoes);
});
