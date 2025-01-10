import SpotifyAuthentication from "./SpotifyAuthentication";

class SpotifyQueueHandler {
	constructor(store) {
		this.sdk = SpotifyAuthentication.getSdk();
		this.store = store;
	}

	async addSongToQueue(song) {
		try {
			if (!this.store.current_track.uri) {
				await this._startPlaybackWithSong(song.uri);
			} else {
				await this._addSongToQueueRequest(song.uri);
				this.store.addToQueue(song);
			}
		} catch (error) {
			console.error("Failed to add song to queue", error);
		}
	}

	async _startPlaybackWithSong(songUri) {
		try {
			await this.sdk.player.startResumePlayback(
				this.store.device_id,
				null,
				[songUri]
			);
		} catch (error) {
			console.error("Error starting playback with song:", error);
			throw error;
		}
	}

	async _addSongToQueueRequest(songUri) {
		const accessToken = await SpotifyAuthentication.getAccessToken();

		try {
			const response = await fetch(
				`https://api.spotify.com/v1/me/player/queue?uri=${songUri}&device_id=${this.store.device_id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error(
					`Failed to add song to queue: ${response.statusText}`
				);
			}
		} catch (error) {
			console.error("Error adding song to queue:", error);
			throw error;
		}
	}
}

export default SpotifyQueueHandler;
