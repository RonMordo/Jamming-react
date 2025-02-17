import Tracklist from "../Tracklist/Tracklist";

function SearchResults({ tracks, isPlaylist, addTrackHandler }) {
  return (
    <Tracklist
      tracks={tracks}
      isPlaylist={isPlaylist}
      addTrackHandler={addTrackHandler}
    />
  );
}

export default SearchResults;
