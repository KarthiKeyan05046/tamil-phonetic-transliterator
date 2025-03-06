import { olipeyarppu } from "./olipeyappu.js";
import transliterationRules from "./rules.js";

const specialCase: Record<string, string> = transliterationRules.special_case || {};

/**
 * Replace Tamil words with their special-case transliteration
 * @param match - Matched Tamil word
 * @returns Transliterated word if found, else empty string
 */
function replaceWord(match: string): string {
  return specialCase[match] || "";
}

/**
 * Main function for Tamil to English transliteration
 * @param tamilText - Input Tamil text
 * @returns Transliterated English text
 */
export function translite(tamilText: string): string {
  let romanText = "";
  let wordStart = true;
  let i = 0;

  // Identifying pattern for special case replacement
  const pattern = Object.keys(specialCase).map(escapeRegExp).join("|");
  tamilText = tamilText.replace(new RegExp(pattern, "g"), replaceWord);

  while (i < tamilText.length) {
    if (
      i + 1 < tamilText.length &&
      transliterationRules.letter_rule.hasOwnProperty(tamilText.slice(i, i + 2))
    ) {
      // Handle compound Tamil letters (like - கி, மீ)
      const tamWord = tamilText.slice(i, i + 2);
      const prevComb = tamilText.slice(i - 2, i);
      const nextNextChar = tamilText[i + 2] || "";
      const nextChar = tamilText[i + 1] || "";

      romanText += olipeyarppu(wordStart, tamWord, prevComb, nextNextChar, nextChar);
      i += 1; // Skip next char as it's processed
      wordStart = false;
    } else if (transliterationRules.letter_rule.hasOwnProperty(tamilText[i] ?? "")) {
      // Handle single Tamil characters (like அ, த)
      const tamWord = tamilText[i];
      const nextChar = tamilText[i + 1] || ""; const prevComb = tamilText.slice(i - 2, i); const nextNextChar = tamilText[i + 2] || "";

      romanText += olipeyarppu(wordStart, tamWord ?? "", prevComb, nextNextChar, nextChar);
    } else {
      // Keep character as it is if no transliteration exists
      romanText += tamilText[i];
    }

    i += 1;
    wordStart = false;

    // Reset wordStart if next character is a space or punctuation
    if (i < tamilText.length && " \n,;:'-_(.$@#%*".includes(tamilText[i - 1] ?? "")) {
      wordStart = true;
    }
  }

  return romanText.trim();
}

/**
 * Escape special characters for regex
 * @param str - Input string
 * @returns Escaped string
 */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Convert an object containing Tamil text to English transliteration
 * @param obj - Object with Tamil values
 * @returns New object with transliterated English values
 */
export function convertTamilObjectToEnglish(obj: Record<string, string>): Record<string, string> {
    const convertedObj: Record<string, string> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (value !== undefined) {
          convertedObj[key] = translite(value);
        }
      }
    }
  
    return convertedObj;
}

export default translite;
