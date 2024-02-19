export const qualityList = [
    'AUDIO_QUALITY_ULTRALOW',
    'AUDIO_QUALITY_LOW',
    'AUDIO_QUALITY_MEDIUM',
    'AUDIO_QUALITY_HIGH'
];
const defaultOptions = {
    invidiousInstance: 'https://iv.ggtyler.dev/',
    shaders: true,
    volume: 50,
    preferredCodec: 'opus',
    maxQuality: 'AUDIO_QUALITY_HIGH',
    showNotices: true,
    fullyHideSidebar: false
};
export function getOptions() {
    const options = localStorage.getItem('options');
    return options ? JSON.parse(options) : defaultOptions;
}
export function setOption(o, v) {
    const options = getOptions();
    options[o] = v;
    localStorage.setItem('options', JSON.stringify(options));
}
