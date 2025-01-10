import SpotifyAuthentication from "./SpotifyAuthentication.js";
import { Song } from "./Song.js";

export default class SpotifySearch {
	constructor() {
		this.sdk = SpotifyAuthentication.getSdk();
	}

	async search(query) {
		if (!query) {
			return [];
		}

		try {
			const response = await this.sdk.search(
				query,
				["track", "artist", "album"],
				0,
				6
			);

			if (!response || !response.tracks || !response.tracks.items) {
				console.warn("No results found for the query:", query);
				return [];
			}

			return response.tracks.items.map(this._mapToSong);
		} catch (error) {
			console.error("Error while searching for tracks:", error);
			return [];
		}
	}
	_mapToSong(item) {
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
