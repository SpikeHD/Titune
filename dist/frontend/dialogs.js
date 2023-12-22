import { getOptions, setOption } from '../util/options';
document.addEventListener('DOMContentLoaded', () => {
    const fullyHideSidebar = getOptions().fullyHideSidebar;
    const sidebar = document.getElementById('side-options');
    const addOpen = document.getElementById('add-open');
    const addClose = document.getElementById('add-close');
    const optionClose = document.getElementById('options-close');
    const submissionClose = document.getElementById('list-close');
    const submissionCreate = document.getElementById('list-submit');
    sidebar.style.opacity = fullyHideSidebar ? '0' : '0.1';
    sidebar.addEventListener('mouseenter', () => {
        sidebar.style.opacity = '1';
    });
    sidebar.addEventListener('mouseleave', () => {
        sidebar.style.opacity = fullyHideSidebar ? '0' : '0.1';
    });
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
    optionClose.addEventListener('click', () => {
        closeModal('options-dialog');
    });
    submissionClose.addEventListener('click', () => {
        closeModal('list-dialog');
    });
    submissionCreate.addEventListener('click', () => {
        open('https://github.com/SpikeHD/Titune/issues/new?assignees=&labels=submission&projects=&template=submission.md&title=%5BSUBMISSION%5D', '_blank');
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
export function registerButtonHandlers() {
    // Create dialog event listeners
    const addButton = document.getElementById('add-icon');
    const optionsButton = document.getElementById('options-icon');
    const listButton = document.getElementById('list-icon');
    addButton.addEventListener('click', () => {
        openModal('add-dialog');
    });
    optionsButton.addEventListener('click', () => {
        openModal('options-dialog');
    });
    listButton.addEventListener('click', () => {
        openModal('list-dialog');
    });
    // Also handle the option inputs
    const inputs = document.querySelectorAll('.option-row input');
    const selects = document.querySelectorAll('.option-row select');
    inputs.forEach((input) => {
        // Inputs have a data-option attribute with the option names
        const option = input.dataset.option;
        // Set the input value to the option value
        // Checkbox check
        if (input.type === 'checkbox') {
            // @ts-expect-error We doin something weird
            input.checked = getOptions()[option];
        }
        else {
            // @ts-expect-error We doin something weird
            input.value = getOptions()[option];
        }
        // Also setup the event listener to update the option when the input changes
        input.onchange = () => {
            // if it's a checkbox
            if (input.type === 'checkbox') {
                // @ts-expect-error We doin something weird
                setOption(option, input.checked);
                return;
            }
            // @ts-expect-error We doin something weird
            setOption(option, input.value);
        };
    });
    selects.forEach((select) => {
        // Selects have a data-option attribute with the option names
        const option = select.dataset.option;
        // Set the select value to the option value
        // @ts-expect-error We doin something weird
        select.value = getOptions()[option];
        // Also setup the event listener to update the option when the select changes
        select.onchange = () => {
            // @ts-expect-error We doin something weird
            setOption(option, select.value);
        };
    });
}
