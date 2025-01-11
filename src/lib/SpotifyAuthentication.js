import {
	AuthorizationCodeWithPKCEStrategy,
	SpotifyApi,
} from "@spotify/web-api-ts-sdk";

class SpotifyAuthentication {
	static instance;

	constructor() {
		if (SpotifyAuthentication.instance) {
			return SpotifyAuthentication.instance;
		}

		this.implicitGrantStrategy = new AuthorizationCodeWithPKCEStrategy(
			import.meta.env.VITE_SPOTIFY_CLIENT_ID,
			import.meta.env.VITE_REDIRECT_TARGET,
			[
				"streaming",
				"user-modify-playback-state",
				"user-read-playback-state",
				"user-library-read",
			]
		);
		this.sdk = new SpotifyApi(this.implicitGrantStrategy);

		this.isLogin = Boolean(Number(localStorage.getItem("isLogin")) || 0);

		SpotifyAuthentication.instance = this;
	}

	/**
	 * Authenticate the user with Spotify
	 * @returns {Promise<void>}
	 */
	async authenticate() {
		try {
			await this.sdk.authenticate();
			localStorage.setItem("isLogin", "1");
			this.isLogin = true;
		} catch (error) {
			console.error("Authentication failed:", error);
		}
	}

	/**
	 * Logout the user from Spotify
	 * @returns {Promise<void>}
	 */
	async logout() {
		try {
			await this.implicitGrantStrategy.removeAccessToken();
			localStorage.setItem("isLogin", "0");
			this.isLogin = false;
			window.location.reload();
		} catch (error) {
			console.error("Logout failed:", error);
		}
	}

	/**
	 * Check if the user is logged in
	 * @returns {boolean}
	 */
	isLogged() {
		return this.isLogin;
	}

	/**
	 * Get the Spotify SDK instance
	 * @returns {SpotifyApi}
	 */
	getSdk() {
		return this.sdk;
	}

	/**
	 * Get the spotify access token
	 * @returns {Promise<string>}
	 */
	async getAccessToken() {
		await this.sdk.authenticate();
		return this.sdk
			.getAccessToken()
			.then((response) => response.access_token);
	}
}

export default new SpotifyAuthentication();
