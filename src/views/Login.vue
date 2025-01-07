<script setup>
import SpotifyAuthentication from "../lib/SpotifyAuthentication.js";
import { gsap } from "gsap";
import { onMounted } from "vue";

onMounted(() => {
	gsap.to("#title", {
		duration: 2.5,
		text: "The Vinyl",
		ease: "none",
	});
});

if (SpotifyAuthentication.isLogged()) {
	window.location.href = "/";
}
</script>

<template>
	<h1
		id="title"
		class="align-middle mt-0 text-[10dvh] font-pacifico py-2"></h1>
	<button @click="SpotifyAuthentication.authenticate()" name="login" class="button-spotify px-10 py-3">
		Login to Spotify
	</button>
</template>
