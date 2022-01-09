export function getRandomColor() {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
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
  validCharsType = "lettersNumbersSymbols",
  length = 16,
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
  predicate: ((el: T) => string) | string
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
