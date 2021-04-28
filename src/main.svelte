<script lang="ts">
  import { onMount } from 'svelte';
  import type Entity from './lib/Entity';
  import Rocket from './lib/Rocket';
  import Vector from './lib/Vector';

  let width: number = 0;
  let height: number = 0;
  let mX: number = 0;
  let mY: number = 0;

  const GRAVITY = 5;

  let entities: Entity[] = [];
  let _entities: Entity[] = [];

  const addEntities = (newEntities: Entity[]) => {
    console.log('test');
    _entities = [..._entities, ...newEntities];
  };

  onMount(() => {
    let frame: any;

    // entities = [...Array(5).keys()].map(
    //   (i) =>
    //     new Rocket(new Vector(Math.random() * i * 60, Math.random() * i * 100))
    // );

    entities = [...Array(10).keys()].map((i) => {
      const pos = new Vector(Math.random() * width, height - 10);
      const rocket = new Rocket(pos, addEntities);

      const acc = new Vector(-Math.random() * 10, -Math.random() * 200 - 300);

      rocket.setAcc(acc);
      return rocket;
    });

    let lastTime: number = getCurrentMilliseconds();
    let timer: number = 0;

    const loop = () => {
      const now: number = getCurrentMilliseconds();
      const dt = (now - lastTime) / 1000.0;
      lastTime = now;

      timer += dt;

      frame = requestAnimationFrame(loop);

      entities = entities.map((entity) => {
        // entity.move(Math.random(), Math.random());
        // entity.setPos(
        //   new Vector(mX - entity.getSize() * 6, mY - entity.getSize() * 6)
        // );
        entity.move(GRAVITY, dt);

        return entity;
      });

      entities = entities.filter(
        (e) =>
          !e.shouldRemove() &&
          e.getPos().y + e.getSize() <= height &&
          e.getPos().x + e.getSize() <= width
      );

      if (_entities.length) {
        entities = [...entities, ..._entities];
        _entities = [];
      }

      if (timer >= 1) {
        entities = [
          ...entities,
          ...[...Array(10).keys()].map((i) => {
            const pos = new Vector(Math.random() * width, height - 10);
            const rocket = new Rocket(pos, addEntities);

            const acc = new Vector(
              -Math.random() * 10,
              -Math.random() * 200 - 300
            );

            rocket.setAcc(acc);
            return rocket;
          }),
        ];
        timer = 0;
      }
    };

    loop();

    return () => cancelAnimationFrame(frame);
  });

  const onMouseMove = (e: any) => {
    mX = e.clientX;
    mY = e.clientY;
  };

  const getCurrentMilliseconds = (): number => new Date().getTime();
</script>

<svelte:window
  on:mousemove={onMouseMove}
  bind:innerWidth={width}
  bind:innerHeight={height}
/>

{#each entities as entity}
  <span
    class="entity"
    style="
    left: {entity.getPos().x}px; top: {entity.getPos()
      .y}px; transform: rotate({entity.getRot()}deg);
      font-size: {entity.getSize() /
      2}em;
      "
  >
    {entity.getEmoji()}
  </span>
{/each}

<style>
  .entity {
    position: absolute;
    cursor: default;
  }
</style>
