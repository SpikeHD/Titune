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
  videoThumbnails: VideoThumbnails[] | [VideoThumbnails[]]
  lengthSeconds: number
}

interface VideoThumbnails {
  quality: string
  url: string
  width: number
  height: number
}

interface VideoFormat {
  url: string
  type: string
  audioQuality: string
}