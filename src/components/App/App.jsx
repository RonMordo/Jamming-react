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
    const token = SpotifyAuth.getAccessToken();
    if (token) {
      console.log("Token obtained:", token);
    }
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
