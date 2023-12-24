const imageMap = {};
export async function cropToSquare(imgUrl) {
    // Check if we've already cropped this image
    if (imageMap[imgUrl])
        return imageMap[imgUrl];
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = await toBlobURL(imgUrl);
    await img.decode();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = Math.min(img.width, img.height);
    canvas.width = size;
    canvas.height = size;
    ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size);
    // Return the canvas as a blob URL
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            // If this comes back null, just return the original URL
            const url = blob ? URL.createObjectURL(blob) : imgUrl;
            imageMap[imgUrl] = url;
            resolve(url);
        });
    });
}
export async function toBlobURL(imgUrl) {
    const resp = await fetch(imgUrl);
    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);
    return url;
}
