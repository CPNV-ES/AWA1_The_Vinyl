import SpotifyAuthentication from "./SpotifyAuthentication";

class SpotifyQueueHandler {
	constructor(store) {
		this.sdk = SpotifyAuthentication.getSdk();
		this.store = store;
	}

	/**
	 * Add a song to the playback queue
	 * @param song {Song}
	 * @returns {Promise<void>}
	 */
	async addSongToQueue(song) {
		try {
			if (!this.store.currentTrack.uri) {
				await this.#startPlaybackWithSong(song.uri);
			} else {
				await this.#addSongToQueueRequest(song.uri);
				this.store.addToQueue(song);
			}
		} catch (error) {
			console.error("Failed to add song to queue", error);
		}
	}

	/**
	 * Start the playback with a specific song
	 * @param songUri {string}
	 * @returns {Promise<void>}
	 * @private
	 */
	async #startPlaybackWithSong(songUri) {
		try {
			await this.sdk.player.startResumePlayback(
				this.store.deviceId,
				null,
				[songUri]
			);
		} catch (error) {
			console.error("Error starting playback with song:", error);
			throw error;
		}
	}

	/**
	 * Add a song to the playback queue
	 * @param songUri {string}
	 * @returns {Promise<void>}
	 * @private
	 */
	async #addSongToQueueRequest(songUri) {
		const accessToken = await SpotifyAuthentication.getAccessToken();

		try {
			const response = await fetch(
				`https://api.spotify.com/v1/me/player/queue?uri=${songUri}&device_id=${this.store.deviceId}`,
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
