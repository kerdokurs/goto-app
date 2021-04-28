export default class Vector {
  public x: number = 0;
  public y: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(vec: Vector): void {
    this.x += vec.x;
    this.y += vec.y;
  }

  public scale(amt: number): void {
    this.x *= amt;
    this.y *= amt;
  }

  public set(vec: Vector): void {
    this.x = vec.x;
    this.y = vec.y;
  }

  public normalize(): void {
    const length = Math.sqrt(this.x * this.x + this.y * this.y);
    this.x /= length;
    this.y /= length;
  }

  public static scale(vec: Vector, amt: number): Vector {
    return new Vector(vec.x * amt, vec.y * amt);
  }
}
