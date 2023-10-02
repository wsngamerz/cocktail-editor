import { CMYK, RGB } from "@/components/picker/types";

const blackCMYK: CMYK = {
  c: 0,
  m: 0,
  y: 0,
  k: 1
}

export function rgb2cmyk(r: number, g: number, b: number): CMYK {
  let computedC = 0;
  let computedM = 0;
  let computedY = 0;
  let computedK = 0;

  if (
    r === null ||
    g === null ||
    b === null ||
    isNaN(r) ||
    isNaN(g) ||
    isNaN(b)
  ) {
    alert("Please enter numeric RGB values!");
    return blackCMYK;
  }
  if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
    alert("RGB values must be in the range 0 to 255.");
    return blackCMYK;
  }

  if (r === 0 && g === 0 && b === 0) {
    return blackCMYK;
  }

  computedC = 1 - r / 255;
  computedM = 1 - g / 255;
  computedY = 1 - b / 255;

  const minCMY = Math.min(computedC, Math.min(computedM, computedY));
  computedC = (computedC - minCMY) / (1 - minCMY);
  computedM = (computedM - minCMY) / (1 - minCMY);
  computedY = (computedY - minCMY) / (1 - minCMY);
  computedK = minCMY;

  return { c: computedC, m: computedM, y: computedY, k: computedK };
}

export const cmykToRgb = ({ c, m, y, k }: CMYK): RGB => {
  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);

  return { r: r, g: g, b: b };
};
