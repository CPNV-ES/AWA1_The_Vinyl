import { defineStore } from "pinia";
import { Song } from "../lib/Song";

export const useSpotifyStore = defineStore("spotify", {
	state: () => ({
		isActive: false,
		isPaused: false,
		player: {},
		currentTrack: {},
		deviceId: "",
		queue: [],
		preview: null,
	}),
	actions: {
		setActive(newValue) {
			this.isActive = newValue;
		},
		setPaused(newValue) {
			this.isPaused = newValue;
		},
		setPlayer(newValue) {
			this.player = newValue;
		},
		setDeviceId(newValue) {
			this.deviceId = newValue;
		},
		setTrack(newValue) {
			this.currentTrack = new Song(
				newValue.name,
				newValue.artists[0].name,
				newValue.album.images[0].url,
				newValue.uri
			);

			if (newValue.uri === this.queue[0]?.uri) {
				this.removeFromQueue(newValue);
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
			let found = false;
			this.queue = this.queue.filter(
				(t) => t.uri !== track.uri || found || !(found = true)
			);
		},
	},
});
