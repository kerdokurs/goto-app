<script lang="ts">
  import Main from './main.svelte';
</script>

<main>
  <Main />
</main>

<style lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :global(body) {
    background: url(/linn.jpg);
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
