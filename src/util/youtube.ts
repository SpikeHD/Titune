import { getOptions } from './options'

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

export function playlistFromLink(link: string) {
  const playlistId = link.match(/(?<=list=)[a-zA-Z0-9_-]+/)?.[0]
  return playlistId
}

export async function playlistVideos(playlistId: string) {
  const inst = getOptions().invidiousInstance
  const result = (await fetch(`${inst}api/v1/playlist/${playlistId}`).then(r => r.json())) as Playlist

  return result.videos
}