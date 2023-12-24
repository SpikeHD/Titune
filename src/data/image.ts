export function cropToSquare(imgUrl: string) {
  const img = new Image()
  img.src = imgUrl

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const size = Math.min(img.width, img.height)

  canvas.width = size
  canvas.height = size

  ctx.drawImage(
    img,
    (img.width - size) / 2,
    (img.height - size) / 2,
    size,
    size,
    0,
    0,
    size,
    size
  )
  
  // Return the canvas as a blob URL
  return new Promise<string>((resolve) => {
    canvas.toBlob((blob) => {
      blob ? resolve(URL.createObjectURL(blob)) : resolve('')
    })
  })
}