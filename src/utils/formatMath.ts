/**
 * Utility to convert raw LaTeX or markup math notations into clean Vietnamese school math representation.
 * For example:
 *   - "\\cdot" -> "." (or "·")
 *   - "\\times" -> "×"
 *   - "^2" -> "²", "^3" -> "³", "^4" -> "⁴", etc.
 *   - "\\frac{a}{b}" -> "a/b"
 *   - "\\sqrt{x}" -> "√x"
 */
export function formatMathNotation(text?: string): string {
  if (!text) return '';

  return text
    // Strip LaTeX display delimiters
    .replace(/\$\$/g, '')
    .replace(/\$/g, '')
    // Replace \sqrt{...} with √(...)
    .replace(/\\sqrt\{([^}]+)\}/g, '√$1')
    .replace(/\\sqrt/g, '√')
    // Replace \frac{a}{b} with a/b
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1/$2')
    // Replace \cdot with dot . as used in Vietnamese middle school math
    .replace(/\\cdot/g, ' · ')
    // Replace \times with ×
    .replace(/\\times/g, ' × ')
    // Replace \le, \ge, \ne, \approx
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\ne/g, '≠')
    .replace(/\\approx/g, '≈')
    // Superscript numbers when written with caret ^
    .replace(/\^0/g, '⁰')
    .replace(/\^1/g, '¹')
    .replace(/\^2/g, '²')
    .replace(/\^3/g, '³')
    .replace(/\^4/g, '⁴')
    .replace(/\^5/g, '⁵')
    .replace(/\^6/g, '⁶')
    .replace(/\^7/g, '⁷')
    .replace(/\^8/g, '⁸')
    .replace(/\^9/g, '⁹')
    .replace(/\^n/g, 'ⁿ')
    .replace(/\^m/g, 'ᵐ')
    // Clean up double spaces
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Robustly compare user answer against correct answer.
 * Handles:
 * - Exact string matches (case insensitive, trimmed)
 * - Fractions (e.g. 3/4 == 6/8 == 0.75)
 * - Exponents/powers (e.g. 2³ == 2^3 == 8)
 * - Booleans (true, false, Đúng, Sai)
 * - Number formatting (comma vs period, e.g. 2,5 == 2.5)
 * Prevents critical parseFloat bugs where "3/5" was evaluated as 3 and equaled "3/4" (3).
 */
export function compareMathAnswers(
  userAns: unknown,
  targetAns: unknown
): boolean {
  if (userAns === undefined || userAns === null || targetAns === undefined || targetAns === null) {
    return false;
  }

  const rawUser = String(userAns).trim().toLowerCase();
  const rawTarget = String(targetAns).trim().toLowerCase();

  if (rawUser === rawTarget) return true;

  // Boolean equivalence in Vietnamese
  if (
    (rawUser === 'true' && (rawTarget === 'true' || rawTarget === 'đúng')) ||
    (rawUser === 'đúng' && (rawTarget === 'true' || rawTarget === 'đúng')) ||
    (rawUser === 'false' && (rawTarget === 'false' || rawTarget === 'sai')) ||
    (rawUser === 'sai' && (rawTarget === 'false' || rawTarget === 'sai'))
  ) {
    return true;
  }

  // Normalize superscripts (⁰..⁹ -> ^0..^9)
  const normalizeSuperscript = (str: string) => {
    const map: Record<string, string> = {
      '⁰': '^0', '¹': '^1', '²': '^2', '³': '^3', '⁴': '^4',
      '⁵': '^5', '⁶': '^6', '⁷': '^7', '⁸': '^8', '⁹': '^9',
    };
    return str.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (c) => map[c] || c);
  };

  const cleanUser = normalizeSuperscript(rawUser).replace(/\s+/g, '').replace(',', '.');
  const cleanTarget = normalizeSuperscript(rawTarget).replace(/\s+/g, '').replace(',', '.');

  if (cleanUser === cleanTarget) return true;

  // Evaluate simple powers like 2^3 -> 8
  const evaluatePower = (val: string): number | null => {
    if (val.includes('^')) {
      const parts = val.split('^');
      if (parts.length === 2) {
        const base = Number(parts[0]);
        const exp = Number(parts[1]);
        if (!isNaN(base) && !isNaN(exp)) {
          return Math.pow(base, exp);
        }
      }
    }
    return null;
  };

  // Evaluate fraction (a/b) or decimal number safely
  const parseFractionOrNumber = (val: string): number | null => {
    const powVal = evaluatePower(val);
    if (powVal !== null) return powVal;

    if (val.includes('/')) {
      const parts = val.split('/');
      if (parts.length === 2) {
        const num = Number(parts[0]);
        const den = Number(parts[1]);
        if (!isNaN(num) && !isNaN(den) && den !== 0) {
          return num / den;
        }
      }
      return null;
    }

    const n = Number(val);
    return isNaN(n) ? null : n;
  };

  const valUser = parseFractionOrNumber(cleanUser);
  const valTarget = parseFractionOrNumber(cleanTarget);

  if (valUser !== null && valTarget !== null) {
    return Math.abs(valUser - valTarget) < 0.0001;
  }

  // Strip non-alphanumeric trailing units (e.g. "10 cm" vs "10")
  const stripUnits = (str: string) => str.replace(/(cm²|cm|m²|m|kg|g|%|độ|°)$/g, '').trim();
  const strippedUser = stripUnits(cleanUser);
  const strippedTarget = stripUnits(cleanTarget);

  if (strippedUser === strippedTarget) return true;

  const valStrippedUser = parseFractionOrNumber(strippedUser);
  const valStrippedTarget = parseFractionOrNumber(strippedTarget);

  if (valStrippedUser !== null && valStrippedTarget !== null) {
    return Math.abs(valStrippedUser - valStrippedTarget) < 0.0001;
  }

  return false;
}
