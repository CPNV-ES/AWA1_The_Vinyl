<script setup>
import VinylPlayer from "../components/graphicComponents/VinylPlayer.vue";
import SearchBar from "../components/SearchBar.vue";
import VinylCoverQueue from "../components/graphicComponents/VinylCoverQueue.vue";
import SongPreview from "../components/SongPreview.vue";

import { onMounted } from "vue";
import { useSpotifyStore } from "../stores/spotify";
import SpotifyPlayer from "../lib/SpotifyPlayer";
import SpotifyAuthentication from "../lib/SpotifyAuthentication";

let spotifyPlayer = null;
const store = useSpotifyStore();

onMounted(() => {
	spotifyPlayer = new SpotifyPlayer(store);
	spotifyPlayer.initPlayer();
});
</script>

<template>
	<template v-if="!store.is_active"
		><b> Transfering playback to The Vinyl... Please wait. </b>
	</template>
	<template v-else>
		<nav class="justify-between flex gap-4">
			<SearchBar @onPick:song="player.addToQueue($event)" />
			<button
				@click="SpotifyAuthentication.logout()"
				name="logout"
				class="button-spotify px-3 py-1">
				<b>Logout</b>
			</button>
		</nav>
		<div class="grow flex flex-col lg:flex-row perspective-1600">
			<section
				class="flex justify-center items-center h-full w-[50dvw] px-[5dvh] relative">
				<h1
					class="absolute top-0 left-[2dvh] text-2xl font-pacifico uppercase font-bold">
					Current song
				</h1>
				<div class="h-[15dvh] w-[15dvh] absolute top-20 left-[10dvh]">
					<SongPreview
						v-if="store.current_track"
						:song="store.current_track" />
				</div>
				<VinylPlayer :player="spotifyPlayer" :store="store"/>
			</section>
			<section
				class="flex items-center h-full w-[50dvw] px-[5dvh] relative">
				<h1
					class="absolute top-0 left-[2dvh] text-2xl font-pacifico uppercase font-bold">
					Next songs
				</h1>
				<!-- <VinylCoverQueue :queue="player.queue.value" /> -->
			</section>
		</div>
	</template>
</template>

<script>
export default { name: "Home" };
</script>
