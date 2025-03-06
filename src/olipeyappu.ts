import transliterationRules from './rules'

const vallinam: string[] = ["க", "ச", "ட", "த", "ப", "ற"];
const mellinam: string[] = ["ங", "ஞ", "ண", "ந", "ம", "ன"];
const idaiyinam: string[] = ["ய", "ர", "ல", "வ", "ழ", "ள"];

const ka_rule = transliterationRules.ka_rule || {};
const sa_rule = transliterationRules.sa_rule || {};
const ta_rule = transliterationRules.ta_rule || {};
const pa_rule = transliterationRules.pa_rule || {};
const tha_rule = transliterationRules.tha_rule || {};
const extras = transliterationRules.extras || {};

// Combines consonant with vowel sign
function extras_comb(letter: string): string[] {
    return Object.keys(extras).map(constant => letter + constant);
}

// Rules
export function olipeyarppu(
    word_start: boolean,
    tam_word: string,
    prev_comb: string,
    next_next_char?: string,
    next_char?: string
): string {
    let roman_text = "";

    if (word_start) {
        if (extras_comb("க").includes(tam_word)) {
            roman_text += ka_rule[tam_word as keyof typeof ka_rule] ?? "";
        } else if (extras_comb("த").includes(tam_word)) {
            roman_text += tha_rule[tam_word as keyof typeof tha_rule] ?? "";
        } else if (extras_comb("ட").slice(2).includes(tam_word)) {
            roman_text += ta_rule[tam_word as keyof typeof ta_rule] ?? "";
        } else if (extras_comb("ப").includes(tam_word)) {
            roman_text += pa_rule[tam_word as keyof typeof pa_rule] ?? "";
        } else {
            roman_text += transliterationRules.letter_rule[tam_word as keyof typeof transliterationRules.letter_rule] ?? "";
        }
    } else if (tam_word === "க" && prev_comb === "று") {
        roman_text += "ka";
    } else if ([...vallinam, ...idaiyinam, ...mellinam, "ஸ", "ஷ"].some(letter => prev_comb === letter + "்")) {
        if (prev_comb === "ன்") {
            if (tam_word === "று") {
                roman_text += "dru";
            } else if (tam_word === "றி") {
                roman_text += "dri";
            } else if (tam_word === "ற") {
                roman_text += "dra";
            } else if (tam_word === "றை") {
                roman_text += "drai";
            } else if (extras_comb("ப").includes(tam_word)) {
                roman_text += transliterationRules.letter_rule[tam_word as keyof typeof transliterationRules.letter_rule] || "";
            }
        }
        if (roman_text === "" && ["க்", "ச்", "ட்", "த்", "ப்", "ற்", "ஷ்", "ஸ்"].includes(prev_comb)) {
            roman_text += ka_rule[tam_word as keyof typeof ka_rule] || "";
            roman_text += sa_rule[tam_word as keyof typeof sa_rule] || "";
            roman_text += ta_rule[tam_word as keyof typeof ta_rule] || "";
            roman_text += tha_rule[tam_word as keyof typeof tha_rule] || "";
            roman_text += pa_rule[tam_word as keyof typeof pa_rule] || "";
        }

        if (["ஞ்", "ங்"].includes(prev_comb)) {
            for (const [key, value] of Object.entries(extras)) {
                if (vallinam.some(letter => tam_word === letter + key)) {
                    roman_text += value;
                }
            }
        }
        if (roman_text === "") {
            roman_text += transliterationRules.letter_rule[tam_word as keyof typeof transliterationRules.letter_rule] || "";
        }
    } else if (tam_word === "ற்" && next_next_char === "ற") {
        roman_text += "t";
    } else {
        roman_text += transliterationRules.letter_rule[tam_word as keyof typeof transliterationRules.letter_rule] || "";
    }

    return roman_text;
}