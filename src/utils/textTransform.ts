/**
 * Utility functions for case conversion, text analysis, and formatting.
 */

// Title case minor words (articles, short conjunctions, short prepositions)
const TITLE_CASE_MINOR_WORDS = new Set([
  'a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at',
  'to', 'from', 'by', 'with', 'in', 'of', 'into', 'onto', 'over', 'off'
]);

/**
 * Converts text to Sentence case.
 * Capitalizes the first character of each sentence, lowercases the rest.
 */
export function toSentenceCase(text: string): string {
  if (!text) return '';
  
  // Lowercase the entire text first
  const lower = text.toLowerCase();
  
  // Regex matches sentence starts: beginning of string or after (. ! ? \n) followed by optional whitespace
  return lower.replace(/(^\s*|\.\s*|\!\s*|\?\s*|\n\s*)([a-z\u00C0-\u017F])/g, (match, prefix, char) => {
    return prefix + char.toUpperCase();
  });
}

/**
 * Converts text to lower case.
 */
export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

/**
 * Converts text to UPPER CASE.
 */
export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

/**
 * Converts text to Capitalized Case (every word's first letter capitalized).
 */
export function toCapitalizedCase(text: string): string {
  if (!text) return '';
  return text.toLowerCase().replace(/(^|\s|[-_([{/])([a-z\u00C0-\u017F])/g, (match, prefix, char) => {
    return prefix + char.toUpperCase();
  });
}

/**
 * Converts text to aLtErNaTiNg cAsE.
 * Starts with lowercase, then uppercase, alternating on alphabetical characters.
 */
export function toAlternatingCase(text: string): string {
  if (!text) return '';
  let upper = false;
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/[a-zA-Z\u00C0-\u017F]/.test(char)) {
      result += upper ? char.toUpperCase() : char.toLowerCase();
      upper = !upper;
    } else {
      result += char;
    }
  }
  return result;
}

/**
 * Converts text to Title Case following standard rules.
 * Major words capitalized, minor words lowercased unless first or last in sentence.
 */
export function toTitleCase(text: string, preserveAcronyms = false): string {
  if (!text) return '';
  
  // Split into lines to preserve line structure
  return text.split('\n').map(line => {
    // Split into words while retaining delimiters
    const tokens = line.split(/(\s+|[-–—/])/);
    let wordIndex = 0;
    
    // Count total actual words in line
    const actualWords = tokens.filter(t => /\S/.test(t) && !/^[-–—/]$/.test(t));
    const totalWords = actualWords.length;
    
    return tokens.map(token => {
      if (!token || !/\S/.test(token) || /^[-–—/]$/.test(token)) {
        return token;
      }
      
      const isFirst = wordIndex === 0;
      const isLast = wordIndex === totalWords - 1;
      wordIndex++;
      
      const cleanWord = token.toLowerCase();
      
      if (preserveAcronyms && token.length > 1 && token === token.toUpperCase()) {
        return token;
      }
      
      if (!isFirst && !isLast && TITLE_CASE_MINOR_WORDS.has(cleanWord)) {
        return cleanWord;
      }
      
      // Capitalize first letter
      return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
    }).join('');
  }).join('\n');
}

/**
 * Converts text to InVErsE CaSe (flips character cases).
 */
export function toInverseCase(text: string): string {
  if (!text) return '';
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === c.toUpperCase() && c !== c.toLowerCase()) {
      result += c.toLowerCase();
    } else if (c === c.toLowerCase() && c !== c.toUpperCase()) {
      result += c.toUpperCase();
    } else {
      result += c;
    }
  }
  return result;
}

/**
 * Helper to split text into words for programming cases.
 */
function getWords(text: string): string[] {
  if (!text) return [];
  // Match words handling camelCase, snake_case, kebab-case, and spaces
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9\u00C0-\u017F]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * camelCase: firstWordSecondWord
 */
export function toCamelCase(text: string): string {
  const words = getWords(text);
  if (words.length === 0) return '';
  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

/**
 * PascalCase: FirstWordSecondWord
 */
export function toPascalCase(text: string): string {
  const words = getWords(text);
  return words
    .map(word => {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

/**
 * snake_case: first_word_second_word
 */
export function toSnakeCase(text: string): string {
  const words = getWords(text);
  return words.map(w => w.toLowerCase()).join('_');
}

/**
 * kebab-case: first-word-second-word
 */
export function toKebabCase(text: string): string {
  const words = getWords(text);
  return words.map(w => w.toLowerCase()).join('-');
}

/**
 * CONSTANT_CASE / SCREAMING_SNAKE_CASE: FIRST_WORD_SECOND_WORD
 */
export function toConstantCase(text: string): string {
  const words = getWords(text);
  return words.map(w => w.toUpperCase()).join('_');
}

/**
 * dot.case: first.word.second.word
 */
export function toDotCase(text: string): string {
  const words = getWords(text);
  return words.map(w => w.toLowerCase()).join('.');
}

/**
 * URL Slug: removes accents, symbols, replaces spaces with hyphens
 */
export function toSlug(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Utility transformations
 */
export function removeExtraSpaces(text: string): string {
  return text
    .split('\n')
    .map(line => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n');
}

export function removeEmptyLines(text: string): string {
  return text
    .split('\n')
    .filter(line => line.trim().length > 0)
    .join('\n');
}

export function sortLines(text: string, direction: 'asc' | 'desc' = 'asc'): string {
  const lines = text.split('\n');
  lines.sort((a, b) => {
    return direction === 'asc' 
      ? a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
      : b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' });
  });
  return lines.join('\n');
}

export function removeDuplicateLines(text: string): string {
  const lines = text.split('\n');
  const seen = new Set<string>();
  const uniqueLines: string[] = [];
  for (const line of lines) {
    if (!seen.has(line)) {
      seen.add(line);
      uniqueLines.push(line);
    }
  }
  return uniqueLines.join('\n');
}

export function reverseText(text: string): string {
  return Array.from(text).reverse().join('');
}

export interface TextStats {
  characterCount: number;
  characterCountNoSpaces: number;
  wordCount: number;
  lineCount: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
}

/**
 * Accurate real-time text statistics calculation
 */
export function calculateTextStats(text: string): TextStats {
  const characterCount = text.length;
  const characterCountNoSpaces = text.replace(/\s/g, '').length;
  
  // Word count: split on whitespace and filter empty
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = text.trim() === '' ? 0 : words.length;
  
  // Line count: empty text has 0 lines, otherwise count newlines + 1
  const lineCount = text === '' ? 0 : text.split('\n').length;
  
  // Sentence count: sentences end with . ! ? followed by space or end of string
  const sentences = text.trim().split(/[.!?]+(?:\s+|$)/).filter(s => s.trim().length > 0);
  const sentenceCount = text.trim() === '' ? 0 : sentences.length;
  
  // Paragraph count: separated by double newline or non-empty lines
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const paragraphCount = text.trim() === '' ? 0 : paragraphs.length;
  
  // Reading speed ~ 200 words per minute
  const readingTimeMinutes = Math.ceil(wordCount / 200);
  // Speaking speed ~ 130 words per minute
  const speakingTimeMinutes = Math.ceil(wordCount / 130);

  return {
    characterCount,
    characterCountNoSpaces,
    wordCount,
    lineCount,
    sentenceCount,
    paragraphCount,
    readingTimeMinutes,
    speakingTimeMinutes
  };
}
