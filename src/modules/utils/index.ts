export * from "./lib-helpers";

export function getRandomColor() {
  // return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
  return generateHslaColor();
}
export function getHashColor(text: string) {
  return generateHslaColor(getBoundedHashNumber(text));
}
function generateHslaColor(
  randomNumber = Math.random(),
  saturation = 100,
  lightness = 40,
  alpha = 1
) {
  const hue = (randomNumber * 360).toFixed();

  return `hsla(${hue},${saturation}%,${lightness}%,${alpha})`;
}

/** https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript */
export function getHashNumber(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}
export function getBoundedHashNumber(str: string, seed = 0): number {
  const num = getHashNumber(str, seed);
  return (num % 2e14) / 2e14;
}

export function slugify(str: string) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

/**
 * https://dev.to/nicozerpa/never-use-mathrandom-to-create-passwords-in-javascript-3i9j
 */
const lettersNumbersSymbols =
  "0123456789" +
  "abcdefghijklmnopqrstuvwxyz" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  ',.-{}+!"#$%/()=?';
const lowerLettersNumbers = "0123456789" + "abcdefghijklmnopqrstuvwxyz";
const validCharsOptions = {
  lettersNumbersSymbols,
  lowerLettersNumbers,
};
export function generatePassword({
  length = 16,
  validCharsType = "lowerLettersNumbers",
}: {
  validCharsType?: keyof typeof validCharsOptions;
  length?: number;
} = {}) {
  let generatedPassword = "";
  const validChars = validCharsOptions[validCharsType];

  for (let i = 0; i < length; i++) {
    let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0]!;
    randomNumber = randomNumber / 0x100000000;
    randomNumber = Math.floor(randomNumber * validChars.length);

    generatedPassword += validChars[randomNumber];
  }

  return generatedPassword;
}

export const uniqBy = <T>(
  arr: T[],
  predicate: string | ((el: T) => string)
) => {
  const cb =
    typeof predicate === "function"
      ? predicate
      : (o: T) => (o as any)[predicate as any];

  return [
    ...arr
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : cb(item);

        map.has(key) || map.set(key, item);

        return map;
      }, new Map())
      .values(),
  ];
};

/**
 * Like Object.keys() but with types.
 * https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208
 */
export function keys<T>(o: T): Exclude<keyof T, number>[] {
  /* tslint:disable:ban */
  return Object.keys(o) as any;
  /* tslint:enable:ban */
}

export function cn(
  ...args: (string | "" | 0 | false | null | undefined)[]
): string {
  return args.filter((a) => a).join(" ");
}

export function unreachable(_: never) {}

export function timeoutPromiseSuccess<T>(promise: Promise<T>, timeout = 1000) {
  const timeoutPromise = new Promise((resolve) => setTimeout(resolve, timeout));
  return Promise.race([promise, timeoutPromise]);
}

export function dateTimeFormatter(dateString: Date | string) {
  const date = dateString instanceof Date ? dateString : new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(+date - +now);
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  if (diffHours > 12) {
    return date.toLocaleDateString();
  } else {
    return date.toLocaleTimeString();
  }
}

export const nonNullable = <T>(item: T | null | undefined): item is T =>
  item !== null && item !== undefined;
export const nullable = <T>(
  item: T | null | undefined
): item is null | undefined => item === null || item === undefined;

export const sortBy =
  <T>(funcs: ((a: T) => number | string)[], orders: ("asc" | "desc")[]) =>
  (a: T, b: T) => {
    for (const [i, f] of funcs.entries()) {
      const aResult = f(a);
      const bResult = f(b);
      const val = aResult > bResult ? 1 : bResult > aResult ? -1 : 0;
      const sortVal = orders[i] === "desc" ? val * -1 : val;
      if (sortVal !== 0) {
        return sortVal;
      }
    }
    return 0;
  };
export const getNonNullable = <T>(item: T | null | undefined): T => {
  if (nullable(item)) {
    throw new Error("expected non nullable item");
  }
  return item;
};
