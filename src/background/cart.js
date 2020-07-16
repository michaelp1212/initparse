import { v1 as uuid } from "uuid";
import produce, { original } from "immer";
import { filter } from "ramda";

//
// Cart Structure:
// const shoppingCart = {
//   items: [
//    [ uuid, { user, product and client data }],
//    ...
//   ]
// }

//  Shopping Cart: {
//   'uuid': { client, sort: 1, product, size, color, quantity: 1 }
// }

//
//
// Adding a product to a cart associates an in cart id so that
// the same product can be placed in the cart multiple times
// and removed individually.
//
export const add = produce((draft, product, size, color) => {
  draft.items.push([uuid(), { product, size, color }]);
});

export const empty = produce((draft = {}) => {
  draft.items = [];
});

//
// remove by generated in cart id from add
//
export const remove = produce((draft, cid) => {
  draft.items = filter(([id, _]) => id !== cid, original(draft.items));
});
