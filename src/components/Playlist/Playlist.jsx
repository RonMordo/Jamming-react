import styles from "./Playlist.module.css";
import Tracklist from "../Tracklist/Tracklist";
import buttonStyle from "../SearchBar/SearchBar.module.css";

function Playlist({
  name,
  tracks,
  isPlaylist,
  removeTrackHandler,
  setPlaylistName,
  saveToSpotify,
}) {
  return (
    <div className={styles.playlistContainer}>
      <input
        type="text"
        className={styles.playlistName}
        value={name}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <Tracklist
        tracks={tracks}
        isPlaylist={isPlaylist}
        removeTrackHandler={removeTrackHandler}
      />
      <div className={styles.buttonContainer}>
        <button className={buttonStyle.searchButton} onClick={saveToSpotify}>
          SAVE TO SPOTIFY
        </button>
      </div>
    </div>
  );
}

export default Playlist;
