import { defineStore } from "pinia";
import { Song } from "../lib/Song";

export const useSpotifyStore = defineStore("spotify", {
	state: () => ({
		is_active: false,
		is_paused: false,
		player: {},
		current_track: {},
		device_id: "",
		queue: [],
		preview: null,
	}),
	actions: {
		setActive(newValue) {
			this.is_active = newValue;
		},
		setPaused(newValue) {
			this.is_paused = newValue;
		},
		setPlayer(newValue) {
			this.player = newValue;
		},
		setDeviceId(newValue) {
			this.device_id = newValue;
		},
		setTrack(newValue) {
			this.current_track = new Song(
				newValue.name,
				newValue.artists[0].name,
				newValue.album.images[0].url,
				newValue.uri
			);
			if (newValue.uri === this.queue[0]?.uri) {
				this.queue.shift();
				this.preview = null;
			}
		},
		setPreview(newValue) {
			this.preview = newValue;
		},
		addToQueue(track) {
			this.queue.push(track);
		},
		removeFromQueue(track) {
			this.queue = this.queue.filter((t) => t.uri !== track.uri);
		},
	},
});
