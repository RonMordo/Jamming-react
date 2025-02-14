import styles from "./Tracklist.module.css";
import Track from "../Track/Track";

function Tracklist({
  tracks,
  isPlaylist,
  addTrackHandler,
  removeTrackHandler,
}) {
  console.log("tracklist:", tracks);
  return (
    <ul className={styles.ul}>
      {tracks &&
        tracks.map((track) => (
          <li key={track.id}>
            <Track
              track={track}
              isPlaylist={isPlaylist}
              addTrackHandler={addTrackHandler}
              removeTrackHandler={removeTrackHandler}
            />
          </li>
        ))}
    </ul>
  );
}

export default Tracklist;
