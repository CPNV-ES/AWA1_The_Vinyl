import {AuthorizationCodeWithPKCEStrategy, SpotifyApi} from '@spotify/web-api-ts-sdk';

class SpotifyAuthentication {
	constructor() {
		this.implicitGrantStrategy = new AuthorizationCodeWithPKCEStrategy(
			import.meta.env.VITE_SPOTIFY_CLIENT_ID,
			import.meta.env.VITE_REDIRECT_TARGET,
			['user-read-private', 'user-read-email']
		)
		this.sdk = new SpotifyApi(this.implicitGrantStrategy);
		if (localStorage.getItem('isLogin')) {
			this.isLogin = Boolean(Number(localStorage.getItem('isLogin')))
		} else {
			this.isLogin = false
			localStorage.setItem('isLogin', String(0))
		}
	}

	async authenticate() {
		await this.sdk.authenticate();
		await localStorage.setItem('isLogin', String(1));
		this.isLogin = true;
		window.location.reload();
	}

	async logout() {
		await this.implicitGrantStrategy.removeAccessToken()
		await localStorage.setItem('isLogin', String(0))
		this.isLogin = false;
		console.log('logout', this.isLogin)
		window.location.reload();
	}

	isLogged() {
		return this.isLogin
	}

	getSdk() {
		return this.sdk
	}
}

export default SpotifyAuthentication;
