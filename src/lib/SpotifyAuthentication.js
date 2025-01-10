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
				"user-read-private",
				"user-read-email",
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

	async authenticate() {
		try {
			await this.sdk.authenticate();
			localStorage.setItem("isLogin", "1");
			this.isLogin = true;
			window.location.reload();
		} catch (error) {
			console.error("Authentication failed:", error);
		}
	}

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

	isLogged() {
		return this.isLogin;
	}

	getSdk() {
		return this.sdk;
	}

	async getAccessToken() {
		await this.sdk.authenticate();
		return this.sdk
			.getAccessToken()
			.then((response) => response.access_token);
	}

	transferPlayback(device_id) {
		return this.sdk.player.transferPlayback([device_id], true);
	}
}

export default new SpotifyAuthentication();
