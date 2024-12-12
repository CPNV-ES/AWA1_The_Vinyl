import { SpotifyApi } from '@spotify/web-api-ts-sdk';

class SpotifyAuthentication {
	constructor() {
		this.accessToken = localStorage.getItem('spotify_access_token') || null;
	}

	isLoggedIn() {
		return this.accessToken !== null;
	}

	async login() {
		await SpotifyApi.performUserAuthorization(
			import.meta.env.VITE_SPOTIFY_CLIENT_ID,
			import.meta.env.VITE_REDIRECT_TARGET,
			['user-read-private', 'user-read-email', 'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public', 'playlist-modify-private', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'user-read-recently-played'],
			(body) => {
				localStorage.setItem('spotify_access_token', JSON.stringify(body));
			}
		);
		this.accessToken = JSON.parse(localStorage.getItem('spotify_access_token'));
		await this.reconnect();
	}

	async reconnect () {
		const token = JSON.parse(localStorage.getItem('spotify_access_token'));
		this.sdk = SpotifyApi.withAccessToken(
			import.meta.env.VITE_SPOTIFY_CLIENT_ID,
			token
		);
		console.log(await this.sdk.currentUser.profile());
		console.log(await this.sdk.search('eminem', 'track'));
	}

	getAccessToken() {
		if (this.accessToken == null) {
			throw new Error('No access token found');
		} else {
			return this.accessToken;
		}
	}

	logout() {
		if (this.sdk) this.sdk.logOut();
		localStorage.removeItem('spotify_access_token');
		this.accessToken = null;
	}
}

export default SpotifyAuthentication;