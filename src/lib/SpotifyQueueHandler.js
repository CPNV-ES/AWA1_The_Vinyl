import SpotifyAuthentication from "./SpotifyAuthentication";
import { useSpotifyStore } from "../stores/spotify";

class SpotifyQueueHandler {
	constructor() {
		this.sdk = SpotifyAuthentication.getSdk();
		this.store = useSpotifyStore();
	}

	addSongToQueue(song) {
		this.sdk.player.addItemToPlaybackQueue(song.uri, this.store.device_id);
	}

	async getQueue() {
		const response = await this.sdk.player.getUsersQueue();
		return response;
	}
}

export default SpotifyQueueHandler;
