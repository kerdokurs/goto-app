import Confetti from './Confetti';
import Entity from './Entity';
import type Vector from './Vector';
import { degToRad } from './utils';

export default class Rocket extends Entity {
  constructor(pos: Vector, acc: Vector, addEntities: Function) {
    super('🚀', pos, acc, addEntities);
    this.initialRot = -45;
    this.setSize(4);
  }

  public action(pos: Vector): void {
    const confetties: Entity[] = [];

    // outer ring
    let confettiAmt = Math.floor(Math.random() * 20);
    let angleIncrement = 360 / confettiAmt;
    let startAngle = Math.random() * 360;

    let currentAngle = startAngle;
    for (let i = 0; i < confettiAmt; i++) {
      // i have no clue why this does not work properly
      // all of the confetti clumps together
      // it should not do that. there seems to be a memory
      // issue with typescript of svelte specifically
      const acc: Vector = {
        x: Math.cos(degToRad(currentAngle)) * 20,
        y: Math.sin(degToRad(currentAngle)) * 20,
      };

      console.log(currentAngle);

      const confetti = new Confetti(pos, acc, this.addEntities);

      confetties.push(confetti);

      currentAngle += angleIncrement;
      currentAngle %= 360;
    }

    // inner ring
    confettiAmt = Math.floor(Math.random() * 10);
    angleIncrement = 360 / confettiAmt;
    startAngle = Math.random() * 360;

    for (let i = 0; i < confettiAmt; i++) {
      // generating a acceleration vector in the direction
      // of the ray from this.pos along the angle
      const acc: Vector = {
        x: Math.cos(degToRad(currentAngle)) * 20,
        y: Math.sin(degToRad(currentAngle)) * 128,
      };

      const confetti = new Confetti(pos, acc, this.addEntities);

      confetties.push(confetti);

      currentAngle += angleIncrement;
      currentAngle %= 360;
    }

    this.remove = true;
    this.addEntities(confetties);
  }

  public bump(mouse: Vector): void {
    const dx = this.pos.x - mouse.x;
    const dy = this.pos.y - mouse.y;

    this.acc.x += dx;
    this.acc.y += dy;
  }

  protected isAction(): boolean {
    return this.acc.y >= 0;
  }
}
