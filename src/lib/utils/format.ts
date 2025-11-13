/**
 * Formats a number into a compact, human-readable string.
 * e.g., 1000 -> 1k, 1500 -> 1.5k, 1000000 -> 1M
 *
 * @param num The number to format.
 * @returns A compact string representation of the number.
 */
export const formatCompactNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  }

  if (num < 1_000_000) {
    const thousands = num / 1000;
    // Use toFixed(1) and remove .0 if it exists
    return `${parseFloat(thousands.toFixed(1))}k`;
  }

  if (num < 1_000_000_000) {
    const millions = num / 1_000_000;
    return `${parseFloat(millions.toFixed(1))}M`;
  }

  const billions = num / 1_000_000_000;
  return `${parseFloat(billions.toFixed(1))}B`;
};
