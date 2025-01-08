import SpotifyAuthentication from "./SpotifyAuthentication.js";
import {Song} from "./Song.js";

export default class SpotifySearch {
	constructor() {
		this.sdk = SpotifyAuthentication.getSdk();
	}

    async search(query) {
		if (!query) {
			return [];
		}
		const response = await this.sdk.search(query, ['track', 'artist', 'album'], 0, 6);
	    return response.tracks.items.map((item) => {
		    return new Song(
			    item.name,
			    item.artists.map((artist) => artist.name).join(', '),
			    item.album.images[0].url
		    );
	    });
    }
}
