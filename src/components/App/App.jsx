import { useState, useEffect } from "react";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SpotifyAuth from "../../SpotifyAuth";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [profile, setProfile] = useState(null);

  const addTrackHandler = (track) => {
    setPlaylistTracks((prevPlaylist) => {
      if (
        !prevPlaylist.some((existingTrack) => existingTrack.id === track.id)
      ) {
        return [...prevPlaylist, track];
      }
      return prevPlaylist;
    });

    setSearchResults((prevSearchResults) =>
      prevSearchResults.filter((existingTrack) => existingTrack.id !== track.id)
    );
  };

  const removeTrackHandler = (track) => {
    setPlaylistTracks((prevPlaylist) =>
      prevPlaylist.filter((existingTrack) => existingTrack.id !== track.id)
    );

    setSearchResults((prevSearchResults) => {
      if (
        !prevSearchResults.some(
          (existingTrack) => existingTrack.id === track.id
        )
      ) {
        return [...prevSearchResults, track];
      }
      return prevSearchResults;
    });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = SpotifyAuth.getAccessToken();
      if (token) {
        console.log("Token obtained:", token);
        try {
          const profileData = await SpotifyAuth.fetchProfile(token);
          if (profileData) {
            console.log(profileData);
          }
          setProfile(profileData);
        } catch (error) {
          console.log("Failed to load profile:", error);
        }
      }
    };
    fetchProfile();
  }, []);

  const searchTracks = async (term) => {
    const tracks = await SpotifyAuth.searchSpotify(term);
    setSearchResults(tracks);
  };

  const saveToSpotify = () => {
    const uris = playlistTracks.map((track) => track.uri);
    setPlaylistName("New Playlist");
    SpotifyAuth.savePlaylist(playlistName, uris);
    setPlaylistTracks([]);
    setSearchResults([]);
  };

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.heading}>Jamming</h1>
      <SearchBar searchTracks={searchTracks} />
      {profile && (
        <div className={styles.profileContainer}>
          <h2>
            Logged in as{" "}
            <span className={styles.displayName}>{profile.display_name}</span>
          </h2>
          <div className={styles.profileImg}>
            <img src={profile.images?.[0]?.url} alt="Profile picture" />
          </div>
          <ul>
            <li>
              User ID: <span className={styles.id}>{profile.id}</span>
            </li>
            <li>
              <a className={styles.uri} href={profile.external_urls.spotify}>
                Spotify URI
              </a>
            </li>
            <li>
              <a className={styles.imgUrl} href={profile.images?.[0]?.url}>
                Profile Image
              </a>
            </li>
          </ul>
        </div>
      )}
      <div className={styles.interface}>
        <div className={styles.searchResults}>
          <h2>Results</h2>
          <SearchResults
            tracks={searchResults}
            isPlaylist={false}
            addTrackHandler={addTrackHandler}
          />
        </div>
        <div className={styles.playlist}>
          <h2>Playlist</h2>
          <Playlist
            name={playlistName}
            tracks={playlistTracks}
            isPlaylist={true}
            removeTrackHandler={removeTrackHandler}
            setPlaylistName={setPlaylistName}
            saveToSpotify={saveToSpotify}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
