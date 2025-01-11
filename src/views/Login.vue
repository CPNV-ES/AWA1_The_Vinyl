<script setup>
import SpotifyAuthentication from "../lib/SpotifyAuthentication.js";
import { gsap } from "gsap";
import { onMounted } from "vue";

onMounted(() => {
	gsap.to("#title", {
		duration: 1,
		text: "The Vinyl",
		ease: "none",
	});
	gsap.to("#slogan", {
		duration: 1,
		text: "Modern Beats, Retro Vibes.",
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
	<h4 id="slogan" class="font-pacifico pt-2 pb-5"></h4>
	<button
		@click="SpotifyAuthentication.authenticate()"
		name="login"
		class="button-spotify px-10 py-3">
		Login to Spotify
	</button>
</template>
