import R from "ramda";
import currency from "currency.js";

export const titleAttribute = element =>
  String.prototype.trim.apply(element.title);

export const allAnchorTitles = element => {
  const as = element.querySelectorAll("a");
  return Array.from(as).map(titleAttribute);
};

// canonical :: HTMLElement -> String
export const canonical = doc => {
  const link = doc.querySelector('link[rel="canonical"]');

  // TODO: Fix this @jblock
  if (link && link.href) return link.href;
  return "";
  // return link ? link.href : can;
};

export const toArray = x => (R.is(Array, x) ? x : [x]);

// linkedData :: HTMLElement -> object
export const linkedData = element => {
  if (!element) return {};

  let data;
  try {
    data = toArray(JSON.parse(element.text));
  } catch (err) {
    return {};
  }

  const product = data.find(obj => obj["@type"] === "Product");
  const offers = toArray(product.offers);
  //
  // todo: try out jsonld lib to get more coverage
  //
  // todo: extract me
  const colors = offers.reduce((arr, offer) => {
    const color = R.path(["itemOffered", "color"], offer);
    return color ? arr.concat(color) : arr;
  }, []);
  //
  // todo: extract me
  const prices = offers.reduce((arr, offer) => {
    const { price } = offer;
    return price ? arr.concat(price) : arr;
  }, []);

  return Object.assign(
    R.pick(["name", "productID", "url", "image"], product),
    { colors },
    { prices }
  );
};

export const toDecimal = str => {
  return currency(str).value;
};
