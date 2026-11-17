import type { SocialUser } from './socialUser'

export type SocialPostMedia = {
  id: number
  position: number
  mediaType: string
  url: string
  alt?: string
}

export type SocialPost = {
  id: number
  userId: number
  caption: string
  location?: string
  postedAt: string
  likeCount: number
  commentCount: number
  media: SocialPostMedia[]
}

export type SocialComment = {
  id: number
  text: string
  postedAt: string
  user: SocialUser
}

export type SocialHighlight = {
  id: number
  title: string
  coverUrl?: string
}

export type SocialProfile = SocialUser & {
  postCount: number
  following: number
  highlights: SocialHighlight[]
  // Real users following this profile, shown as "Gevolgd door ...".
  followedBy: SocialUser[]
  category?: string
  website?: string
}
