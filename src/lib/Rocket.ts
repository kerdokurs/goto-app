import Confetti from './Confetti';
import Entity from './Entity';
import Vector from './Vector';

export default class Rocket extends Entity {
  constructor(pos: Vector, addEntities: Function) {
    super('🚀', pos, addEntities);
    this.initialDir = -45;
    this.setSize(4);
  }

  public action(pos: Vector): void {
    let confettiAmt = Math.floor(Math.random() * 20);
    let angleIncrement = 360 / confettiAmt;
    let startAngle = Math.random() * 360;

    const confetties: Entity[] = [];

    let currentAngle = startAngle;
    for (let i = 0; i < confettiAmt; i++) {
      const vec = new Vector(
        Math.cos(degToRad(currentAngle)) * 20,
        Math.sin(degToRad(currentAngle)) * 128
      );

      console.log(currentAngle);

      const confetti = new Confetti(pos, this.addEntities);
      confetti.setAcc(vec);

      confetties.push(confetti);

      currentAngle += angleIncrement;
      currentAngle %= 360;
    }

    confettiAmt = Math.floor(Math.random() * 10);
    angleIncrement = 360 / confettiAmt;
    startAngle = Math.random() * 360;

    for (let i = 0; i < confettiAmt; i++) {
      const vec = new Vector(
        Math.cos(degToRad(currentAngle)) * 20,
        Math.sin(degToRad(currentAngle)) * 128
      );

      const confetti = new Confetti(pos, this.addEntities);
      confetti.setAcc(vec);

      confetties.push(confetti);

      currentAngle += angleIncrement;
      currentAngle %= 360;
    }

    this.remove = true;
    this.addEntities(confetties);
  }

  protected isAction(): boolean {
    return this.acc.y >= 0;
  }
}

const degToRad = (deg: number): number => (Math.PI * deg) / 180.0;
