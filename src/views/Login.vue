<template>
    <h1 id="title" class="align-middle mt-0 text-[10dvh] font-pacifico"></h1>
    <button name="login" class="button-spotify px-10 py-3">Login to Spotify</button>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: 'Login',
  mounted() {
    gsap.to("#title", {
      duration: 2.5,
      text: "The Vinyl",
      ease: "none",
    });
  }
};
</script>
