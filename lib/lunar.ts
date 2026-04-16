/**
 * lunar.ts — Moon position and zodiac sign detection
 *
 * Uses the astronomia package to compute the moon's ecliptic longitude.
 * No external API — fully local astronomical calculation.
 *
 * Zodiac sign indices: Aries=0, Taurus=1, Gemini=2, Cancer=3, Leo=4, Virgo=5,
 *                      Libra=6, Scorpio=7, Sagittarius=8, Capricorn=9,
 *                      Aquarius=10, Pisces=11
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { julian, moonposition } = require('astronomia');

export const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
] as const;

export type ZodiacSign = typeof SIGNS[number];

export const SIGN_INDEX: Record<ZodiacSign, number> = {
  Aries: 0, Taurus: 1, Gemini: 2, Cancer: 3, Leo: 4, Virgo: 5,
  Libra: 6, Scorpio: 7, Sagittarius: 8, Capricorn: 9, Aquarius: 10, Pisces: 11,
};

export function moonLongitude(date = new Date()): number {
  const jd = julian.DateToJD(date);
  const pos = moonposition.position(jd);
  const deg = (pos.lon * 180) / Math.PI;
  return ((deg % 360) + 360) % 360;
}

export function moonSignIndex(date = new Date()): number {
  return Math.floor(moonLongitude(date) / 30);
}

export function moonSign(date = new Date()): ZodiacSign {
  return SIGNS[moonSignIndex(date)];
}

export function moonInSign(sign: ZodiacSign, date = new Date()): boolean {
  return moonSignIndex(date) === SIGN_INDEX[sign];
}

/** True if the moon entered `sign` between yesterday and today — the transit moment. */
export function transitOccurredToday(sign: ZodiacSign, now = new Date()): boolean {
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  return !moonInSign(sign, yesterday) && moonInSign(sign, now);
}
