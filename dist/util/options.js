export const qualityList = [
    'AUDIO_QUALITY_ULTRALOW',
    'AUDIO_QUALITY_LOW',
    'AUDIO_QUALITY_MEDIUM',
    'AUDIO_QUALITY_HIGH'
];
const defaultOptions = {
    invidiousInstance: 'https://vid.puffyan.us/',
    shaders: true,
    volume: 50,
    preferredCodec: 'mp4a',
    maxQuality: 'AUDIO_QUALITY_HIGH'
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
