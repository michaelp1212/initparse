import { allAnchorTitles, titleAttribute, toDecimal } from "../helpers.js";

const allAnchorDataInfo = element => {
  const as = element.querySelectorAll("a");
  return Array.from(as).map(a => a.getAttribute("data-info"));
};

const childImages = element => {
  console.log("Child Images in the Rag & Bone");
  const imgs = element.querySelectorAll("img.primary-image");
  return Array.from(imgs).map(img => img.src);
};

const definition = {
  name: "rag & bone",
  host: "www.rag-bone.com",
  product: {
    productID: ".style-number",
    name: ["h1.product-name"],
    url: [".product-aside > span"],
    price: [
      ".product-price .product-pricing .price-sales",
      ".product-price .product-pricing .price-promo",
      ".product-price .product-pricing .price-standard",
      el => toDecimal(el.textContent)
    ],
    colors: [".product-variations .swatches.color", allAnchorTitles],
    color: [".swatches.color li.selected a", titleAttribute],
    sizes: [".product-variations .sizes", allAnchorDataInfo],
    size: [".swatches.size li.selected a", titleAttribute],
    images: [".product-content", childImages]
  }
};
export default definition;
