<script lang="ts">
  import Main from './main.svelte';
</script>

<main>
  <Main />
</main>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Krona+One&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<style lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Krona One', sans-serif;
  }
</style>
