import styles from "./Track.module.css";

function Track({ track, isPlaylist, addTrackHandler, removeTrackHandler }) {
  return (
    <div className={styles.trackContainer}>
      <div className={styles.about}>
        <p className={styles.trackName}>{track.name}</p>
        <div className={styles.info}>
          <p className={styles.artist}>{track.artist} ||</p>
          <p className={styles.album}>{track.album}</p>
        </div>
      </div>
      <div className={styles.addButton}>
        {isPlaylist && removeTrackHandler ? (
          <button onClick={() => removeTrackHandler(track)}>-</button>
        ) : addTrackHandler ? (
          <button onClick={() => addTrackHandler(track)}>+</button>
        ) : null}
      </div>
    </div>
  );
}

export default Track;
