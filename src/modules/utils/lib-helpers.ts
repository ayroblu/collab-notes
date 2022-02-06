import stringify from "fast-json-stable-stringify";
import isEqual from "lodash/isEqual";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { v4 as uuidv4 } from "uuid";

export function getRandomName() {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: " ",
  });
}

export { uuidv4 };

export function createCache<T, V>(func: (params: T) => V) {
  const cache: { [key: string]: V } = {};

  return (params: T) => {
    const cacheKey = stringify(params);
    const { cacheKey: cachedValue } = cache;
    if (cachedValue) {
      return cachedValue;
    }
    const result = func(params);
    cache[cacheKey] = result;
    return result;
  };
}

export function checkEqual<T>(prev: T, next: T): T {
  return isEqual(prev, next) ? prev : next;
}
