import { linkedData } from "../helpers.js";

const idNumberOnly = el => {
  const content = el.textContent;
  const id = content.match(/\d+/);
  return id ? id[0] : id;
};

const colors = el => {
  const swatches = el.querySelectorAll(".color-swatch");
  return Array.from(swatches).map(swatch => swatch.getAttribute("data-color"));
};

const sizes = el => {
  const sizes = el.querySelectorAll("[data-name]");
  return Array.from(sizes).map(size => size.getAttribute("data-name"));
};

const images = el => {
  const imgs = el.querySelectorAll(".main-image-img");
  return Array.from(imgs).map(img => {
    return img.getAttribute("src");
  });
};

const definition = {
  name: "Bloomingdales",
  host: "www.bloomingdales.com",
  product: {
    productID: [
      '[data-auto="product-description-bullets"] li:last-child',
      idNumberOnly
    ],
    name: '[data-auto="product-name"]',
    // url: canonical outside
    price: [".price .final-price > span"],
    colors: [".color-swatch-container", colors], // todo: color selection and what about child data-color-available=true
    sizes: ['select[data-label="size"]', ".size-dropdown", sizes], // todo: size selection
    images: [".main-image-container", images]
  }
};
export default definition;
