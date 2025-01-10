import SpotifyAuthentication from "./SpotifyAuthentication.js";
import { Song } from "./Song.js";

export default class SpotifySearch {
	constructor() {
		this.sdk = SpotifyAuthentication.getSdk();
	}

	/**
	 * Search for tracks on Spotify
	 * @param query {string}
	 * @returns {Promise<Song[]>}
	 */
	async search(query) {
		if (!query) return [];

		try {
			const response = await this.sdk.search(query, ["track"], 0, 6);

			if (!response || !response.tracks || !response.tracks.items) {
				console.warn("No results found for the query:", query);
				return [];
			}

			return response.tracks.items.map(this.#mapToSong);
		} catch (error) {
			console.error("Error while searching for tracks:", error);
			return [];
		}
	}

	/**
	 * Map the Spotify API response to a Song object
	 * @param item {Object}
	 * @returns {Song}
	 * @private
	 */
	#mapToSong(item) {
		const name = item.name || "Unknown";
		const artistNames =
			item.artists?.map((artist) => artist.name).join(", ") ||
			"Unknown Artist";
		const albumImageUrl =
			item.album?.images[0]?.url || "default-image-url.jpg";
		const uri = item.uri || "";

		return new Song(name, artistNames, albumImageUrl, uri);
	}
}
