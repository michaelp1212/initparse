import { allAnchorTitles, titleAttribute, toDecimal } from "../helpers.js";

const childImages = element => {
  const imgs = element.querySelectorAll(
    ".product-primary-image .product-image .primary-image"
  );
  return Array.from(imgs).map(img => img.src);
};

const definition = {
  name: "Vince",
  host: "www.vince.com",
  product: {
    productID: ".product-number [itemprop=productID]",
    name: ['.product-name[itemprop="name"]', ".product-name"],
    brand: "Vince", // TODO: Make sure this is always true
    url: ['#product-content [itemprop="url"]'],
    price: [
      ".product-price .price-sales",
      "#product-content .price-sales",
      el => {
        return toDecimal(el.textContent);
      }
    ],
    images: [".product-image-container", childImages],
    colors: [".swatches.color", allAnchorTitles],
    color: [".swatches.color li a", titleAttribute],
    sizes: [".swatches.size", allAnchorTitles],
    size: [".swatches.size li a", titleAttribute]
  }
};

export default definition;
