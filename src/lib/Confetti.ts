import Entity from './Entity';
import type Vector from './Vector';

export default class Confetti extends Entity {
  constructor(pos: Vector, acc: Vector, addEntities: Function) {
    super('✨', pos, acc, addEntities);
    this.setSize(2);
  }

  public action(pos: Vector): void {}

  public bump(): void {}

  protected isAction(): boolean {
    return false;
  }
}
