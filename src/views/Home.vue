<script setup>
import VinylPlayer from "../components/graphicComponents/VinylPlayer.vue";
import SearchBar from "../components/SearchBar.vue";
import VinylCoverQueue from "../components/graphicComponents/VinylCoverQueue.vue";
import SongPreview from "../components/SongPreview.vue";

import { onMounted, ref } from "vue";
import { useSpotifyStore } from "../stores/spotify";
import SpotifyPlayer from "../lib/SpotifyPlayer";
import SpotifyAuthentication from "../lib/SpotifyAuthentication";
import SpotifyQueueHandler from "../lib/SpotifyQueueHandler";

let spotifyPlayer = null;
let queue = ref([]);
const store = useSpotifyStore();

const SpotifyQueue = new SpotifyQueueHandler(store);

onMounted(() => {
	spotifyPlayer = new SpotifyPlayer(store);
	spotifyPlayer.initPlayer();
});

function addSongToQueue(song) {
	SpotifyQueue.addSongToQueue(song).then(() => {
		queue.value = [...SpotifyQueue.getQueue()];
	});
    
}
</script>

<template>
	<nav class="justify-between flex gap-4">
		<SearchBar @onPick:song="addSongToQueue($event)" />
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
			<template v-if="store.is_active">
				<div class="h-[15dvh] w-[15dvh] absolute top-20 left-[10dvh]">
					<SongPreview
						v-if="store.current_track"
						:song="{
                            name: store.current_track.name,
                            artist: store.current_track.artists[0].name,
                            cover: store.current_track.album.images[0].url,
                            uri: store.current_track.uri
                        }" />
				</div>
				<VinylPlayer :player="spotifyPlayer" :store="store" />
			</template>
		</section>
		<section class="flex items-center h-full w-[50dvw] px-[5dvh] relative">
			<h1
				class="absolute top-0 left-[2dvh] text-2xl font-pacifico uppercase font-bold">
				Next songs
			</h1>
			<VinylCoverQueue :queue="queue" />
		</section>
	</div>
</template>
<script>
export default { name: "Home" };
</script>
