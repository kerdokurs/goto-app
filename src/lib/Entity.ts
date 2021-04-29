import { radToDeg } from './utils';
import Vector from './Vector';

export default abstract class Entity {
  protected rot: number = 0;
  protected size: number = 4;

  protected acc: Vector = new Vector(0, 1);

  protected initialDir = -45;
  protected dir: Vector = new Vector(0, 1);

  protected remove: boolean = false;

  constructor(
    protected emoji: string,
    protected pos: Vector,
    protected addEntities: Function
  ) {}

  /**
   * Move current entity according to gravity and delta time
   *
   * @param gravity gravity
   * @param dt delta time
   */
  public move(gravity: number, dt: number): void {
    this.pos.x += this.acc.x * 10 * dt;
    this.pos.y += this.acc.y * dt;

    this.acc.y += gravity;

    // If its "action time" 😎, action!
    if (this.isAction()) {
      this.action(this.pos);
    }

    // Getting the direction the entity should face
    this.dir.set(this.acc);
    this.dir.normalize();
    this.rot = -radToDeg(Math.atan(this.dir.x / this.dir.y)) + this.initialDir;
  }

  /**
   * Do a specialised action
   *
   * @param pos position of action
   */
  public abstract action(pos: Vector): void;

  public abstract bump(mouse: Vector): void;

  /**
   * Is it "action time" 😎 yet?
   */
  protected abstract isAction(): boolean;

  public getPos(): Vector {
    return this.pos;
  }

  public setPos(pos: Vector): void {
    this.pos = pos;
  }

  public getAcc(): Vector {
    return this.acc;
  }

  public setAcc(acc: Vector): void {
    this.acc = acc;
  }

  public getRot(): number {
    return this.rot;
  }

  public getEmoji() {
    return this.emoji;
  }

  public getSize(): number {
    return this.size;
  }

  public setSize(size: number): void {
    this.size = size;
  }

  public shouldRemove(): boolean {
    return this.remove;
  }
}
