import SpotifyAuthentication from "./SpotifyAuthentication";

class SpotifyQueueHandler {
	constructor(store) {
		this.sdk = SpotifyAuthentication.getSdk();
		this.store = store;
	}

	addSongToQueue(song) {
		this.sdk.player.addItemToPlaybackQueue(song.uri, this.store.device_id);
	}

	async getQueue() {
		const response = await this.sdk.player.getUsersQueue();
        
        return response.queue;
	}
}

export default SpotifyQueueHandler;
