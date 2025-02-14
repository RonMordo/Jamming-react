# Jammming - Spotify Playlist Creator

Jammming is a React-based web app that lets users search for songs on Spotify, create playlists, and save them directly to their Spotify accounts.

## Features

- Spotify authentication with Implicit Grant Flow.
- Search for tracks using the Spotify API.
- Add and remove tracks from your custom playlist.
- Save playlists to your Spotify account.
- Responsive design for desktop and mobile.

## Tech Stack

- React with Vite for development.
- CSS Modules for styling.
- Spotify Web API for data and playlist management.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jammming.git
   ```
2. Navigate to the project directory:
   ```bash
   cd jammming
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Add Spotify API credentials:
   - Create a `.env` file in the root directory.
   - Add your Spotify Client ID:
     ```env
     VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
     ```
5. Run the project:
   ```bash
   npm run dev
   ```

## Spotify API Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Create a new application and copy the Client ID.
3. Set the Redirect URI to `http://localhost:3000/`.
4. Add the Client ID to your `.env` file.

## Testing

- Use React Developer Tools for inspecting components.
- Add console logs and breakpoints for debugging.
- Manually test by creating playlists, adding/removing tracks, and saving them.

## Project Structure

- `SpotifyAuth.js` handles authentication and API requests.
- `SearchBar.jsx` manages user input and search requests.
- `Playlist.jsx` manages playlist creation and saving.
- `Tracklist.jsx` and `Track.jsx` render track details and actions.

## Future Enhancements

- Add backend for user data storage.
- Display user profiles.
- Improve UI with better animations and transitions.

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss your ideas.

## License

This project is licensed under the MIT License.
