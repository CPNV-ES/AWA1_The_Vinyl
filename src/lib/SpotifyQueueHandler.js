import SpotifyAuthentication from "./SpotifyAuthentication";

class SpotifyQueueHandler {
	constructor(store) {
		this.sdk = SpotifyAuthentication.getSdk();
		this.store = store;
	}

	async addSongToQueue(song) {
		if (!this.store.current_track.uri) {
			await this.sdk.player.startResumePlayback(
				this.store.device_id,
				null,
				[song.uri]
			);
		} else {
			await this.addSongToQueueRequest(
				await SpotifyAuthentication.getAccessToken(),
				this.store.device_id,
				song.uri
			);

			this.store.addToQueue(song);
		}
	}

	async addSongToQueueRequest(accessTokens, deviceId, songUri) {
		const response = await fetch(
			"https://api.spotify.com/v1/me/player/queue?uri=" +
				songUri +
				"&device_id=" +
				deviceId,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json,",
					Authorization: "Bearer " + accessTokens,
				},
			}
		);
	}
}

export default SpotifyQueueHandler;
