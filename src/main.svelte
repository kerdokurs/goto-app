<script lang="ts">
  import { onMount } from 'svelte';
  import type Entity from './lib/Entity';
  import Rocket from './lib/Rocket';
  import { getCurrentMilliseconds } from './lib/utils';
  import type Vector from './lib/Vector';

  let width: number = 0;
  let height: number = 0;
  let mX: number = 0;
  let mY: number = 0;

  const GRAVITY = 5;

  let entities: Entity[] = [];
  let _entities: Entity[] = [];

  /**
   * Method for handling adding new entities
   *
   * @param newEntities new entities
   */
  const addEntities = (newEntities: Entity[]) => {
    _entities = [..._entities, ...newEntities];
  };

  /**
   * Method for generating new rockets to launch
   *
   * @param amt amount of rockets
   */
  const generateNewRockets = (amt: number) => {
    // Using simple (Java/Type)script magic to generate an array of rockets
    addEntities(
      [...Array(amt).keys()].map((i) => {
        const pos: Vector = {
          x: Math.random() * (width - 40) + 20,
          y: height - 10,
        };
        const acc = { x: -Math.random() * 20, y: -Math.random() * 200 - 450 };
        const rocket = new Rocket(pos, acc, addEntities);

        return rocket;
      })
    );
  };

  /**
   * Svelte hook which will be run when the component is mounted
   */
  onMount(() => {
    let frame: any;

    generateNewRockets(10);

    // For delta time
    let lastTime: number = getCurrentMilliseconds();
    let timer: number = 0;

    // Main loop
    const loop = () => {
      // For delta time
      const now: number = getCurrentMilliseconds();
      const dt = (now - lastTime) / 1000.0;
      lastTime = now;

      timer += dt;

      frame = requestAnimationFrame(loop);

      // Updating entities
      // Since we have to set the array for Svelte to rerender
      // we have to assign a new mapped array to the old array
      entities = entities.map((entity) => {
        entity.move(GRAVITY, dt);

        return entity;
      });

      // Removing entities that should be removed
      entities = entities.filter(
        (e) =>
          !e.shouldRemove() &&
          e.getPos().y + e.getSize() <= height &&
          e.getPos().x + e.getSize() <= width
      );

      // Adding "new" entities
      if (_entities.length) {
        entities = [...entities, ..._entities];
        _entities = [];
      }

      // Adding new rockets every 1.5 seconds
      if (timer >= 1.5) {
        generateNewRockets(10);
        timer = 0;
      }
    };

    loop();

    // This is basically an onDestroy() hook which will be
    // run when the component unmounts
    return () => cancelAnimationFrame(frame);
  });

  // Handling mouse movement on the screen
  const onMouseMove = (e: any) => {
    mX = e.clientX;
    mY = e.clientY;
  };
</script>

<div
  id="space"
  bind:clientWidth={width}
  bind:clientHeight={height}
  on:mousemove={onMouseMove}
>
  <div id="wishes">
    <h1>Palju õnne,</h1>
    <h1>gotoAndPlay!</h1>
  </div>
  {#each entities as entity}
    <span
      class="entity"
      style="
  left: {entity.getPos().x}px; top: {entity.getPos()
        .y}px; transform: rotate({entity.getRot()}deg);
      font-size: {entity.getSize() /
        2}em;
      "
      on:mouseover={() => entity.bump({ x: mX, y: mY })}
    >
      {entity.getEmoji()}
    </span>
  {/each}
</div>

<style>
  .entity {
    position: absolute;
    cursor: default;
  }

  #wishes {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    text-align: center;
    line-height: 2em;
    font-size: 5em;

    cursor: default;

    color: #ffffffd8;
  }

  #space {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    background: #0e0d14;
  }
</style>
