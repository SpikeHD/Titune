document.addEventListener('DOMContentLoaded', () => {
    const addOpen = document.getElementById('add-open');
    const addClose = document.getElementById('add-close');
    addOpen.addEventListener('click', () => {
        // Get the playlist URL or ID from the input
        const input = document.getElementById('playlist-input');
        const radioName = document.getElementById('radio-name-input');
        const urlOrId = input.value;
        // If the input is empty, don't do anything
        if (!urlOrId)
            return;
        // If the input is a URL, get the ID from it
        const url = new URL(urlOrId);
        const id = url.searchParams.get('list');
        // If the input is an ID, use it
        const playlistId = id ?? urlOrId;
        // Set new window location
        window.location.search = `?id=${playlistId}&name=${radioName.value}`;
    });
    addClose.addEventListener('click', () => {
        closeModal('add-dialog');
    });
});
export function openModal(id) {
    const diag = document.getElementById(id);
    diag.showModal();
}
export function closeModal(id) {
    const diag = document.getElementById(id);
    diag.close();
}
