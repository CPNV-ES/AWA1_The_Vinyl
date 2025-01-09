import SpotifyAuthentication from "./SpotifyAuthentication";
import { useSpotifyStore } from "../stores/spotify";

class SpotifyQueueHandler {
	constructor(store) {
		this.sdk = SpotifyAuthentication.getSdk();
		this.store = store;
	}

	async addSongToQueue(song) {
		//await this.sdk.player.addItemToPlaybackQueue(song.uri) error from API
		if (!this.store.current_track.uri) {
			await this.sdk.player.startResumePlayback(this.store.device_id, null, [song.uri]);
		} else {
			await this.addSongToQueueRequest(await SpotifyAuthentication.getAccessToken(), this.store.device_id, song.uri);
		}

	}

	async getQueue() {
		const response = await this.sdk.player.getUsersQueue();

        return response.queue;
	}

	async addSongToQueueRequest(accessTokens, deviceId, songUri) {
		const response = await fetch('https://api.spotify.com/v1/me/player/queue?uri=' + songUri + '&device_id=' + deviceId, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json,',
				'Authorization': 'Bearer ' + accessTokens,
			},
		});
		console.log(response);
	}
}

export default SpotifyQueueHandler;
