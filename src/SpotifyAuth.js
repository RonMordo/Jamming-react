const clientId = "a37b544a988045b797fa3f5374a1e835";
const redirectUri = "http://localhost:5173";

let accessToken;

const SpotifyAuth = {
  getAccessToken() {
    if (accessToken) {
      console.log("Token already in memory:", accessToken);
      return accessToken;
    }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresMatch[1]);

      console.log("Token obtained:", accessToken);

      window.setTimeout(() => {
        accessToken = "";
        console.log("Token expired");
      }, expiresIn * 1000);

      window.history.pushState(null, null, "/");
      return accessToken;
    }

    if (!tokenMatch || !expiresMatch) {
      console.log("No token found, redirecting to Spotify authorization page");
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },
  async fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await result.json();
  },
  async searchSpotify(term) {
    const accessToken = this.getAccessToken();
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
      term
    )}`;

    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const jsonResponse = await response.json();
      if (!jsonResponse.tracks) return [];

      return jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    } catch (error) {
      console.error("Error fetching Spotify tracks:", error);
      return [];
    }
  },
  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) return;

    const accessToken = this.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    const userResponse = await fetch("https://api.spotify.com/v1/me", {
      headers,
    });
    const userData = await userResponse.json();
    const userId = userData.id;

    const createPlaylistResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers,
        method: "POST",
        body: JSON.stringify({
          name: name,
          description: "New playlist created from Jammming app",
          public: true,
        }),
      }
    );
    const playlistData = await createPlaylistResponse.json();
    const playlistId = playlistData.id;

    await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {
        headers,
        method: "POST",
        body: JSON.stringify({
          uris: trackUris,
        }),
      }
    );
  },
};

export default SpotifyAuth;
