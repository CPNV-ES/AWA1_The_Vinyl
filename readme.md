<br />
<div align="center">
  <a href="https://github.com/CPNV-ES/AWA1_The_Vinyl">
  </a>

<h3 align="center">The Vinyl</h3>

  <p align="center">
    Modern Beats, Retro Vibes.
    <br />
  </p>
</div>

## About The Project

The Vinyl is a unique web app that lets users experience their favorite modern tracks on a retro vinyl player interface. By connecting to their premium Spotify account, users can enjoy the nostalgic aesthetic of vintage vinyl while listening to their curated albums and tracks.

### Built With

[![Node][Node.js]][Node-url]
[![Vue][Vue.js]][Vue-url]
[![tailwind][tailwindcss]][tailwindcss-url]
[![Spotify Web API][SpotifyWeb]][SpotifyWeb-url]
[![Spotify WebPlayback API][SpotifyWebPlayback]][SpotifyWebPlayback-url]
[![Vite][Vite]][Vite-url]

## Getting Started

### Development environment

#### Installation & running the project

1. Clone the repo

   ```sh
   git clone https://github.com/CPNV-ES/AWA1_The_Vinyl.git
   ```

2. Install NPM packages

    ```sh
    npm install
    ```

3. Copy the `.env.example` file and rename it to `.env`. Fill in the required information. You'll need to create a Spotify Developer account and create a new app to get the required keys.
4. Run the project

    ```sh
    npm run dev
    ```

## Collaborate

### Convention

#### Commit

The project uses [Conventional Commits][Commit-url]. The keywords used are: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`. The commits are named with the following pattern: `type: description` eg.(feat: add awsome feature).

#### Workflow

The project uses [Gitflow][GitFlow-url]. The branches used are: `main`, `develop`, `feature`, `release`, `hotfix`. The branches are named with the following pattern: `type/short-description` eg.(feature/awsome-feature).

### Versioning

The project uses [SemVer][SemVer-url]. The versioning is done with the following pattern: `major.minor.patch` eg.(1.0.0).

## Miscellaneous

### External resources

#### Spotify

##### API and SDK

The project uses the [Spotify Web API][SpotifyWeb-url] to log in and control the user's queue and playing track.

In the other hand, the [Spotify Web Playback SDK][SpotifyWebPlayback-url] is used to play the tracks on the web app and control the media control (play, pause, next, previous).

Further information can be found on our [wiki][wiki-code-snippet].

[Vue.js]: https://img.shields.io/badge/Vue.js-20232A?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Node.js]: https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/en/
[tailwindcss]: https://img.shields.io/badge/tailwindcss-20232A?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwindcss-url]: https://tailwindcss.com/
[SpotifyWeb]: https://img.shields.io/badge/Spotify%20Web%20API-20232A?style=for-the-badge&logo=spotify&logoColor=spotify
[SpotifyWeb-url]: https://developer.spotify.com/documentation/web-api/
[SpotifyWebPlayback]: https://img.shields.io/badge/Spotify%20Web%20Playback%20SDK-20232A?style=for-the-badge&logo=spotify&logoColor=spotify
[SpotifyWebPlayback-url]: https://developer.spotify.com/documentation/web-playback-sdk/
[Vite]: https://img.shields.io/badge/Vite-20232A?style=for-the-badge&logo=vite&logoColor=vite
[Vite-url]: https://vitejs.dev/
[GitFlow-url]: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
[Commit-url]: https://www.conventionalcommits.org/
[SemVer-url]: https://semver.org/
[wiki-code-snippet]: https://github.com/CPNV-ES/AWA1_The_Vinyl/wiki/Code-snippet-taken-from-elsewhere