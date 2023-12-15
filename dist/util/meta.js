/**
 * We will have two URL params, the "name" and the "id". Name is used for embedding, ID is used for getting the playlist.
 *
 * The name will not matter, as its just for people reading the URL to identify the playlist (especially for embeding in sites and stuff).
 * The playlist ID does matter. Obviously.
 */
export function getRadioName() {
    return new URLSearchParams(window.location.search).get('name');
}
export function getPlaylistId() {
    return new URLSearchParams(window.location.search).get('id');
}
