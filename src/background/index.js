import browser from "webextension-polyfill";
import cache from "webext-storage-cache";

import { isEmpty } from "ramda";

import parser from "./parser";

const initial = {
  starting: "FRESH",
  user: {},
  client: "1",
  clients: [
    { id: "1", name: "Clyde Drexler" },
    { id: "2", name: "Ransom Jones" },
    { id: "3", name: " Candace Kreiger" }
  ],
  cart: {}
};

window.cache = cache;

async function parseContent(host, html) {
  const domparser = new DOMParser();
  const rootElement = domparser.parseFromString(html, "text/html");

  console.debug(`BG parsing content from: ${host}`);
  return parser(host, rootElement.documentElement);
}

const handler = async message => {
  const { type } = message;
  delete message.type;

  console.debug(`BG:MSG > ${type}`);
  console.debug(message);

  if (type === "GET_CACHE") {
    const { key } = message;
    return await cache.get(key);
  }

  if (type === "SET_CACHE") {
    const { key, data, age } = message;
    return await cache.set(key, data, age);
  }

  if (type === "DELETE_CACHE") {
    const { key } = message;
    return await cache.delete(key);
  }

  // Only really for debugging — call this from the popup when necessary
  if (type === "CLEAR_CACHE") {
    return await cache.clear();
  }

  if (type === "INIT") {
    // TODO: DONT" FORGET ABOUT THIS :)
    // await browser.storage.local.clear()
    const existing = await browser.storage.local.get(null);

    if (isEmpty(existing)) {
      await browser.storage.local.set(initial);
      return initial;
    }

    return existing;
  }

  if (type === "PARSE") {
    const { host, html } = message;
    return await parseContent(host, html);
  }

  if (type === "PERSIST") {
    // set it and forget it, part 2
    await browser.storage.local.set(message);
  }
};

browser.runtime.onMessage.addListener(handler);
