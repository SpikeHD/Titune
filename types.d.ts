interface Playlist {
  type: 'playlist'
  title: string
  playlistId: string
  playlistThumbnail: string
  author: string
  authorId: string
  authorUrl: string
  subtitle: string
  authorThumbnails: {
    url: string
    width: number
    height: number
  }[]
  description: string
  videoCount: number
  viewCount: number
  updated: number
  isListed: boolean
  videos: Video[]
}

interface Video {
  title: string
  videoId: string
  author: string
  authorId: string
  authorUrl: string
  videoThumbnails: {
    quality: string
    url: string
    width: number
    height: number
  }[]
  lengthSeconds: number
}

interface VideoFormat {
  url: string
  type: string
  audioQuality: string
}