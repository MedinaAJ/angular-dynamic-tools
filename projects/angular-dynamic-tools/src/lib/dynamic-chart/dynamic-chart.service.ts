import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicChartService {
  
  constructor() {}

  /**
   * Generate color palette
   * @param baseColor
   * @param count
   * @returns
   */
  public generateColorPalette(baseColor: string, count: number): string[] {
    const colors: string[] = [];
    const [h, s, l] = this.hexToHsl(baseColor);

    // Creamos variaciones ajustando la luminosidad y saturación
    for (let i = 0; i < count; i++) {
      const offset = (i - count / 2) * (50 / count);

      let adjustedL = l + offset;
      let adjustedS = s + offset;

      // Nos aseguramos de que los valores permanezcan en el rango [0,100]
      adjustedL = Math.min(100, Math.max(0, adjustedL));
      adjustedS = Math.min(100, Math.max(0, adjustedS));

      colors.push(this.hslToHex(h / 360, adjustedS / 100, adjustedL / 100));
    }

    return colors;
  }

  /**
   * Hex to hsl
   * @param hex
   * @returns
   */
  private hexToHsl(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s;
    const l = (max + min) / 2;

    if (max == min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  }

  /**
   * Hsl to hex
   * @param h
   * @param s
   * @param l
   * @returns
   */
  private hslToHex(h: number, s: number, l: number): string {
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = function hue2rgb(p: any, q: any, t: any) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return (
      '#' +
      Math.round(r * 255)
        .toString(16)
        .padStart(2, '0') +
      Math.round(g * 255)
        .toString(16)
        .padStart(2, '0') +
      Math.round(b * 255)
        .toString(16)
        .padStart(2, '0')
    );
  }
}
