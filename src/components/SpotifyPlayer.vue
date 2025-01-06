<script setup>
import { onMounted } from "vue";
import { useSpotifyStore } from "../stores/spotify";
import SpotifyPlayerService from "../services/SpotifyPlayer.js";

let spotifyPlayerService = null;
const store = useSpotifyStore();

onMounted(() => {

    spotifyPlayerService = new SpotifyPlayerService(store);

    spotifyPlayerService.initPlayer();
});
</script>

<template>
    <div>
        <div>
            <template v-if="!store.is_active">
                <b>
                    Transfering playback to The Vinyl... Please wait.
                </b>
            </template>
            <template v-else>
                <img :src="store.current_track.album.images[0].url" alt="" />

                <div>
                    <div>
                        {{ store.current_track.name }}
                    </div>
                    <div>
                        {{ store.current_track.artists[0].name }}
                    </div>

                    <button @click="spotifyPlayerService.playPreviousTrack()">
                        &lt;&lt;
                    </button>

                    <button @click="spotifyPlayerService.togglePlay()">
                        {{ store.is_paused ? "PLAY" : "PAUSE" }}
                    </button>

                    <button @click="spotifyPlayerService.playNextTrack()">&gt;&gt;</button>
                </div>
            </template>
        </div>
    </div>
</template>
