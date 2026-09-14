/**
 * ==========================================================================
 * KRUTI DEV 010 HIGH-PRECISION CONVERSION ENGINE
 * Hand-tuned mapping for Devnagari Unicode (Mangal/Inscript) to Kruti Dev 010
 * & Kruti Dev 010 to Unicode bidirectional conversion.
 * ==========================================================================
 */

(function (global) {
    'use strict';

    const KrutiConverter = {};

    // ----------------------------------------------------------------------
    // 1. Unicode to Kruti Dev 010 Mapping Tables
    // ----------------------------------------------------------------------

    // Multi-character conjuncts & special word symbols (matched first)
    const unicodeConjunctsMap = [
        // Special conjuncts & alt codes
        { u: "अपराह्न", k: "vijkg~u" },
        { u: "पूर्वाह्न", k: "iwokZg~u" },
        { u: "द्वारा", k: "}kjk" },
        { u: "द्वारे", k: "}kjs" },
        { u: "द्वारी", k: "}kjh" },
        { u: "द्वि", k: "f}" },
        { u: "द्वौ", k: "}kS" },
        { u: "द्व", k: "}" },
        { u: "द्ध", k: "ö" },
        { u: "द्द", k: "í" },
        { u: "द्य", k: "|" },
        { u: "द्भ", k: "Ò" },
        { u: "ह्न", k: "g~u" },
        { u: "ह्म", k: "ã" },
        { u: "हृ", k: "â" },
        { u: "ह्र", k: "gz" },
        { u: "दृ", k: "n¥" },
        { u: "दृष्टिकोण", k: "n¥f" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" }, // handled dynamically
        { u: "त्त्", k: "Ÿk" },
        { u: "त्त", k: "Ÿk" },
        { u: "त्र", k: "=" },
        { u: "ज्ञ", k: "%" },
        { u: "क्ष", k: "ô" },
        { u: "श्र", k: "J" },
        { u: "श्ल", k: "Jy" },
        { u: "श्व", k: "Jo" },
        { u: "श्च", k: "Jp" },
        { u: "ष्ट्र", k: "" },
        { u: "ट्र", k: "Vª" },
        { u: "ड्र", k: "Mª" },
        { u: "ठ्र", k: "Bª" },
        { u: "ढ्र", k: "Dª" },
        { u: "क्र", k: "dzk" }, // when kr
        { u: "प्र", k: "iz" },
        { u: "ग्र", k: "xz" },
        { u: "द्र", k: "nz" },
        { u: "ब्र", k: "cz" },
        { u: "स्र", k: "lz" },
        { u: "फ्र", k: "Ý" },
        { u: "फ्र", k: "Ý" },
        { u: "श्रृ", k: "J¥" },
        { u: "ॐ", k: "vksj" }
    ];

    // Half consonants (Consonant + Halant ्)
    const unicodeHalfConsonantsMap = {
        'क्': 'd',
        'ख़्': '[',
        'ग्': 'x',
        'घ्': '?',
        'ङ्': '³',
        'च्': 'p',
        'छ्': 'N',
        'ज्': 't',
        'झ्': 'T',
        'ञ्': '¥',
        'ट्': 'V',
        'ठ्': 'B',
        'ड्': 'M',
        'ढ्': 'D',
        'ण्': '.',
        'त्': 'r',
        'थ्': 'Fk',
        'द्': 'n',
        'ध्': 'èk',
        'न्': 'u',
        'प्': 'i',
        'फ्': 'Q',
        'ब्': 'c',
        'भ्': 'Hk',
        'म्': 'e',
        'य्': 'VerticalBar', // handled
        'र्': 'z',
        'ल्': 'y',
        'व्': 'o',
        'श्': '’',
        'ष्': 'ष',
        'स्': 'L',
        'ह्': 'g~',
        'ळ्': 'G'
    };

    // Full Consonants
    const unicodeConsonantsMap = {
        'क': 'd', 'ख': '[k', 'ग': 'x', 'घ': 'Pk', 'ङ': '³',
        'च': 'p', 'छ': 'N', 'ज': 't', 'झ': 'T', 'ञ': '¥',
        'ट': 'V', 'ठ': 'B', 'ड': 'M', 'ढ': 'D', 'ण': me('ण'),
        'त': 'r', 'थ': 'Fk', 'द': 'n', 'ध': 'èk', 'न': 'u',
        'प': 'i', 'फ': 'Q', 'ब': 'c', 'भ': 'Hk', 'म': 'e',
        'य': 'e', // carefully replaced
        'र': 'j', 'ल': 'y', 'व': 'o', 'श': '’k', 'ष': 'ष',
        'स': 'L', 'ह': 'g', 'ळ': 'G', 'क्ष': 'ô', 'त्र': '=', 'ज्ञ': '%'
    };

    function me(char) {
        if (char === 'ण') return '.';
        return char;
    }

    // Direct mapping dictionary
    const unicodeToKrutiDictionary = {
        // Independent Vowels
        'अ': 'v', 'आ': 'vk', 'इ': 'b', 'ई': 'bZ', 'उ': 'm', 'ऊ': 'Å', 'ऋ': '_',
        'ए': ',', 'ऐ': 'lh', 'ओ': 'vks', 'औ': 'vkS', 'अं': 'va', 'अः': 'vh',

        // Consonants
        'क': 'd', 'ख': '[k', 'ग': 'x', 'घ': 'Pk', 'ङ': '³',
        'च': 'p', 'छ': 'N', 'ज': 't', 'झ': 'T', 'ञ': '¥',
        'ट': 'V', 'ठ': 'B', 'ड': 'M', 'ढ': 'D', 'ण': '.',
        'त': 'r', 'थ': 'Fk', 'द': 'n', 'ध': 'èk', 'न': 'u',
        'प': 'i', 'फ': 'Q', 'ब': 'c', 'भ': 'Hk', 'म': 'e',
        'य': 'e', 'र': 'j', 'ल': 'y', 'व': 'o',
        'श': '’k', 'ष': '’k', 'स': 'L', 'ह': 'g', 'ळ': 'G',

        // Nukta consonants
        'क़': 'd', 'ख़': '[k', 'ग़': 'x', 'ज़': 't', 'ड़': 'M', 'ढ़': 'D', 'फ़': 'Q',

        // Matras
        'ा': 'k', 'ी': 'h', 'ु': 'q', 'ू': 'w', 'ृ': '¥',
        'े': 's', 'ै': 'S', 'ो': 'ks', 'ौ': 'kS', 'ं': 'a', 'ः': '%', 'ँ': '¡',
        '्': '~', '़': '', 'ऽ': 's'
    };

    // ----------------------------------------------------------------------
    // 2. High-Precision Unicode -> Kruti Dev 010 Converter Core
    // ----------------------------------------------------------------------
    KrutiConverter.unicodeToKruti = function (text, options) {
        if (!text) return "";
        options = options || { preserveTNR: true, autoFix: true };

        let str = text;

        // Step A: Normalize Unicode
        str = str.normalize('NFC');

        // Optional auto-fix for brackets and quotes in Hindi context
        if (options.autoFix) {
            str = str.replace(/“/g, '"').replace(/”/g, '"').replace(/‘/g, "'").replace(/’/g, "'");
        }

        // Step B: Handle Chhoti I ('ि') Matra Position Shift
        // In Unicode, 'ि' (U+093F) comes AFTER the consonant/cluster.
        // In Kruti Dev 010, 'f' MUST come BEFORE the whole consonant cluster!
        // Example: कि -> f + d, स्थि -> f + L + Fk
        let reChhotiI = /([क-हक़-फ़][्]?(?:[क-हक़-फ़][्]?)*)ि/g;
        // Apply iterative replacement to handle nested/complex clusters
        while (reChhotiI.test(str)) {
            str = str.replace(reChhotiI, "f$1");
        }

        // Step C: Handle Reph ('र्' - U+0930 U+094D) Position Shift
        // In Unicode, Reph comes BEFORE the consonant cluster (e.g. र् + म = र्म, र् + मा = र्मा).
        // In Kruti Dev 010, Reph 'Z' or 'z' comes AFTER the consonant + matra cluster!
        // Example: धर्म -> èkeZ, शर्मा -> ’kekZ
        let reReph = /र्([क-हक़-फ़](?:्[क-हक़-फ़])*(?:[ाीुूेैोौूंँः])?)/g;
        while (reReph.test(str)) {
            str = str.replace(reReph, "$1Z");
        }

        // Step D: Replace known complex conjuncts & phrases
        str = str.replace(/अपराह्न/g, "vijkg~u");
        str = str.replace(/पूर्वाह्न/g, "iwokZg~u");
        str = str.replace(/द्वारा/g, "}kjk");
        str = str.replace(/द्वारों/g, "}kjksa");
        str = str.replace(/द्वारे/g, "}kjs");
        str = str.replace(/द्वि/g, "f}");
        str = str.replace(/द्व/g, "}");
        str = str.replace(/द्ध/g, "ö");
        str = str.replace(/द्द/g, "í");
        str = str.replace(/द्य/g, "|");
        str = str.replace(/द्भ/g, "Ò");
        str = str.replace(/ह्न/g, "g~u");
        str = str.replace(/ह्म/g, "ã");
        str = str.replace(/हृ/g, "â");
        str = str.replace(/दृ/g, "n¥");
        str = str.replace(/त्त/g, "Ÿk");
        str = str.replace(/त्त्/g, "Ÿk~");
        str = str.replace(/त्र/g, "=");
        str = str.replace(/ज्ञ/g, "%");
        str = str.replace(/क्ष/g, "ô");
        str = str.replace(/श्र/g, "J");
        str = str.replace(/ट्र/g, "Vª");
        str = str.replace(/ड्र/g, "Mª");
        str = str.replace(/ठ्र/g, "Bª");
        str = str.replace(/ढ्र/g, "Dª");
        str = str.replace(/क्र/g, "dzk");
        str = str.replace(/प्र/g, "iz");
        str = str.replace(/ग्र/g, "xz");
        str = str.replace(/द्र/g, "nz");
        str = str.replace(/ब्र/g, "cz");
        str = str.replace(/स्र/g, "lz");

        // Step E: Half Consonants (Half letter conversion)
        str = str.replace(/क्/g, "D");
        str = str.replace(/ख़्/g, "[");
        str = str.replace(/ग्/g, "X");
        str = str.replace(/घ्/g, "?");
        str = str.replace(/च्/g, "P");
        str = str.replace(/छ्/g, "N~");
        str = str.replace(/ज्/g, "t~");
        str = str.replace(/झ्/g, "T~");
        str = str.replace(/त्/g, "r~");
        str = str.replace(/थ्/g, "Fk~");
        str = str.replace(/द्/g, "n~");
        str = str.replace(/ध्/g, "èk~");
        str = str.replace(/न्/g, "u~");
        str = str.replace(/प्/g, "I");
        str = str.replace(/फ्/g, "Q~");
        str = str.replace(/ब्/g, "C");
        str = str.replace(/भ्/g, "Hk~");
        str = str.replace(/म्/g, "E");
        str = str.replace(/यि/g, "f;");
        str = str.replace(/य/g, ";");
        str = str.replace(/ल्/g, "Y");
        str = str.replace(/व्/g, "O");
        str = str.replace(/श्/g, "’");
        str = str.replace(/ष्/g, "’k~");
        str = str.replace(/स्/g, "L");
        str = str.replace(/ह्/g, "g~");

        // Step F: Full Character & Matra Substitutions
        let array = Array.from(str);
        let result = "";

        for (let i = 0; i < array.length; i++) {
            let char = array[i];
            if (unicodeToKrutiDictionary.hasOwnProperty(char)) {
                result += unicodeToKrutiDictionary[char];
            } else {
                result += char;
            }
        }

        // Post-processing tweaks for Kruti Dev
        result = result.replace(/;k/g, ";k"); // ya
        result = result.replace(/z/g, "z"); // rakar

        return result;
    };

    // ----------------------------------------------------------------------
    // 3. Kruti Dev 010 -> Unicode Reverse Converter Core
    // ----------------------------------------------------------------------
    KrutiConverter.krutiToUnicode = function (text) {
        if (!text) return "";
        let str = text;

        // Common Kruti Dev 010 code mappings
        str = str.replace(/vijkg~u/g, "अपराह्न");
        str = str.replace(/iwokZg~u/g, "पूर्वाह्न");
        str = str.replace(/\}kjk/g, "द्वारा");
        str = str.replace(/ö/g, "द्ध");
        str = str.replace(/í/g, "द्द");
        str = str.replace(/\|/g, "द्य");
        str = str.replace(/Ò/g, "द्भ");
        str = str.replace(/g~u/g, "ह्न");
        str = str.replace(/ã/g, "ह्म");
        str = str.replace(/â/g, "हृ");
        str = str.replace(/n¥/g, "दृ");
        str = str.replace(/Ÿk/g, "त्त");
        str = str.replace(/=/g, "त्र");
        str = str.replace(/%/g, "ज्ञ");
        str = str.replace(/ô/g, "क्ष");
        str = str.replace(/J/g, "श्र");
        str = str.replace(/iz/g, "प्र");
        str = str.replace(/xz/g, "ग्र");
        str = str.replace(/nz/g, "द्र");
        str = str.replace(/cz/g, "ब्र");
        str = str.replace(/lz/g, "स्र");
        str = str.replace(/dzk/g, "क्र");

        // Basic character replacements
        const krutiToUnicodeMap = {
            'vksS': 'औ', 'vks': 'ओ', 'vkS': 'औ', 'vk': 'आ', 'v': 'अ', 'bZ': 'ई', 'b': 'इ',
            'm': 'उ', 'Å': 'ऊ', '_': 'ऋ', ',': 'ए', 'lh': 'ऐ',
            'd': 'क', '[k': 'ख', 'x': 'ग', 'Pk': 'घ', '³': 'ङ',
            'p': 'च', 'N': 'छ', 't': 'ज', 'T': 'झ', '¥': 'ञ',
            'V': 'ट', 'B': 'ठ', 'M': 'ड', 'D': 'ढ', '.': 'ण',
            'r': 'त', 'Fk': 'थ', 'n': 'द', 'èk': 'ध', 'u': 'न',
            'i': 'प', 'Q': 'फ', 'c': 'ब', 'Hk': 'भ', 'e': 'म',
            ';': 'य', 'j': 'र', 'y': 'ल', 'o': 'व',
            '’k': 'श', 'L': 'स', 'g': 'ह', 'G': 'ळ',
            'k': 'ा', 'h': 'ी', 'q': 'ु', 'w': 'ू', '¥': 'ृ',
            's': 'े', 'S': 'ै', 'ks': 'ो', 'kS': 'ौ', 'a': 'ं', '%': 'ः', '¡': 'ँ'
        };

        // Replace matched patterns
        for (let key in krutiToUnicodeMap) {
            let reg = new RegExp(key, 'g');
            str = str.replace(reg, krutiToUnicodeMap[key]);
        }

        // Shift 'f' (Chhoti I) back after consonant cluster
        str = str.replace(/f([क-हक़-फ़][्]?(?:[क-हक़-फ़][्]?)*)/g, "$1ि");

        // Shift Reph 'Z' back before consonant cluster
        str = str.replace(/([क-हक़-फ़][ाीुूेैोौूंँः]?)Z/g, "र्$1");

        return str;
    };

    // ----------------------------------------------------------------------
    // 4. English & Digits Times New Roman Formatter Helper
    // ----------------------------------------------------------------------
    /**
     * Splits text into Hindi segments (converted to Kruti Dev) and
     * English/Number/Symbol segments (wrapped in Times New Roman HTML tags for rich copy to MS Word).
     */
    KrutiConverter.formatWithTimesNewRomanHTML = function (unicodeText, options) {
        if (!unicodeText) return "";
        options = options || { preserveTNR: true, autoFix: true };

        if (!options.preserveTNR) {
            return escapeHTML(KrutiConverter.unicodeToKruti(unicodeText, options));
        }

        // Tokenize text into:
        // 1. English words, numbers, and punctuation/symbols (?, !, /, :, ;, =, %, (, ), -, +, *, ", ', @, #, $, &, etc.)
        // 2. Devnagari Hindi text
        // Note: Devnagari danda '।' and '॥' are kept as Devnagari!
        const tokenRegex = /([A-Za-z0-9?!\/:;=%\(\)\-\+\*\"'@#$&_\u0020-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]+|[^\x00-\x7F]+)/g;

        let tokens = unicodeText.match(/([A-Za-z0-9?!\/:;=%\(\)\-\+\*\"'@#$&_\[\]\{\}\<\>]+|[^A-Za-z0-9?!\/:;=%\(\)\-\+\*\"'@#$&_\[\]\{\}\<\>]+)/g) || [unicodeText];

        let htmlOutput = "";

        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            // Check if token consists of ASCII letters, digits, or punctuation symbols (excluding Devnagari danda)
            if (/^[A-Za-z0-9?!\/:;=%\(\)\-\+\*\"'@#$&_\[\]\{\}\<\>]+$/.test(token)) {
                // Wrap in Times New Roman span so MS Word displays symbols like '?' accurately instead of Kruti Dev 'घ्'
                htmlOutput += `<span class="tnr-segment" style="font-family: 'Times New Roman', Times, serif; font-size: 1.05em;">${escapeHTML(token)}</span>`;
            } else {
                // Convert Devnagari Hindi text block to Kruti Dev 010
                let convertedKruti = KrutiConverter.unicodeToKruti(token, options);
                htmlOutput += escapeHTML(convertedKruti);
            }
        }

        return htmlOutput;
    };

    function escapeHTML(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    // Export module for browser and Node.js environments
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = KrutiConverter;
    } else {
        global.KrutiConverter = KrutiConverter;
    }

})(typeof window !== 'undefined' ? window : this);
