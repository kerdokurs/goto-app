export const radToDeg = (rad: number): number => (180.0 * rad) / Math.PI;

export const degToRad = (deg: number): number => (Math.PI * deg) / 180.0;

export const getCurrentMilliseconds = (): number => new Date().getTime();
