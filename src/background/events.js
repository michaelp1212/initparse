const browser = require("webextension-polyfill");

/*
 * const selected_size = metadata.selected_size || "";
 * const sizes = metadata.all_sizes || [selected_size].filter(Boolean);
 * const selected_color = metadata.selected_color || "";
 * const colors = metadata.all_colors || [selected_color].filter(Boolean);
 * product_name: metadata.product_name || "",
 * vendor_name: metadata.vendor_name || metadata.publisher || "",
 * url: metadata.url || "",
 * // TODO: This should be updating the Product ID instead
 * product_upc: metadata.product_upc || "",
 * color: selected_color,
 * size: selected_size,
 * image: metadata.image || "",
 * price: metadata.price || "",
 * clientId: "",
 * orderId: ""
 */

//
// NOTES
// another plugin to click on elements that exports a schema for each product page of a vendor :hawt:
// when parsing a page, collect hits / misses so we'll know many misses indicating perhaps the page has been updated
// grab the canonical for reference and quick click from the webapp admin etc...

import parser from "./parser.js";

console.log("BACKGROUND > Setting up events");

const handleMessage = async (message, sender, sendResponse) => {
  console.debug(`BACKGROUND MSG: ${message.type}`);

  const { host, doc } = message.data;
  const domparser = new DOMParser();
  const rootElement = domparser.parseFromString(doc, "text/html");

  console.debug(`BACKGROUND HOST: ${host}`);
  console.debug(rootElement.documentElement.querySelector("body"));

  return await parser(host, rootElement.documentElement);

  // if (request.type === "PARSE_METADATA") {
  //   const start = performance.now();
  //   return new Promise((resolve, reject) => {
  //     metascraper({
  //       html: request.html,
  //       url: sender.url
  //     })
  //       .then(metadata => {
  //         const end = performance.now();
  //         console.log("PARSING BENCHMARK: ", end - start);
  //         resolve(metadata);
  //       })
  //       .catch(data => {
  //         console.error("ERROR PARSING METADATA:", data);
  //         reject(data);
  //       });
  //   });
  // }
};

browser.runtime.onMessage.addListener(handleMessage);
