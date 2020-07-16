import { canonical, linkedData } from "./helpers.js";

import vince from "./vince/index.js";
import ragAndBone from "./rag-and-bone/index.js";
import bloomingdales from "./bloomingdales/index.js";

const brandsSupported = [bloomingdales, ragAndBone, vince].reduce(
  (obj, brand) => {
    obj[brand.host] = brand;
    return obj;
  },
  Object.create(null)
);

//
// Each key contains an array of query selectors by priority
// with a final post processing function possible
//
// price: [
// '.sale-price',
// '.price',
// (element) => { .... }
// ]
//

// defaultPostFn:: HTMLElement -> String | Number
export function defaultPostFn(element) {
  return String.prototype.trim.apply(element.textContent);
}

// getBrandDef :: String -> Object
export function getBrandDef(host) {
  const def = brandsSupported[host];
  if (!def) {
    throw new Error("Brand Unsupported");
  }
  return def;
}

// Technically, a DOMString
// split :: String | Array -> [ Array, Function ]
export function split(...args) {
  const arr = args[0];
  if (typeof arr === "string") {
    return [args, defaultPostFn];
  }

  const fn = arr[arr.length - 1];
  return typeof fn === "string" ? [arr, defaultPostFn] : [arr.slice(0, -1), fn];
}

// extract :: [DOMString] -> function -> HTMLElement -> string
export function extract(selectors, fn, doc) {
  const { length } = selectors;

  for (let idx = 0; idx < length; idx++) {
    const el = doc.querySelector(selectors[idx]);
    if (el) {
      return fn(el);
    }
  }
}

// parse :: String ->  HTMLDocument -> Object
export default function parse(host, htmldoc) {
  const { product, name } = getBrandDef(host);
  const base = {
    retailer: name,
    canonical: canonical(htmldoc),
    jsonld: linkedData(
      htmldoc.querySelector('script[type="application/ld+json"]')
    )
  };
  console.log('test');
  return Object.keys(product).reduce((obj, key) => {
    const [selectors, fn] = split(product[key]);
    obj[key] = extract(selectors, fn, htmldoc);
    return obj;
  }, base);
}
