import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { SocialPost, SocialProfile } from '../../../data/socialPost'
import InstaSidebar from './InstaSidebar'
import PostDetail from './PostDetail'
import PostGrid from './Profile/PostGrid'
import ProfileHeader from './Profile/ProfileHeader'
import ProfileHighlights from './Profile/ProfileHighlights'
import { loadInstagramPosts, loadInstagramProfile } from '../Databases/instagramDatabase'
import './instagram.css'

// Profile page for any Instagram user; defaults to Sofia Vale.
// Reuse it for another user by visiting /sandbox/instagram/profile/<username>.
function InstagramProfile() {
  const { username = 'sofia.vale', postId } = useParams()
  const [profile, setProfile] = useState<SocialProfile | null>(null)
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [loading, setLoading] = useState(true)
  const [databaseError, setDatabaseError] = useState<string | null>(null)

  // Reset the page when navigating to another user's profile.
  const [previousUsername, setPreviousUsername] = useState(username)
  if (previousUsername !== username) {
    setPreviousUsername(username)
    setLoading(true)
    setProfile(null)
    setPosts([])
    setDatabaseError(null)
  }

  useEffect(() => {
    let cancelled = false

    const fail = (error: unknown) => {
      if (cancelled) return
      setDatabaseError(
        error instanceof Error ? error.message : 'An unknown database error occurred.',
      )
      setLoading(false)
    }

    loadInstagramProfile(username).then((loadedProfile) => {
      if (cancelled) return
      if (!loadedProfile) {
        setDatabaseError(`User '${username}' does not exist.`)
        setLoading(false)
        return
      }
      setProfile(loadedProfile)
      loadInstagramPosts(loadedProfile.id).then((loadedPosts) => {
        if (cancelled) return
        setPosts(loadedPosts)
        setLoading(false)
      }, fail)
    }, fail)

    return () => {
      cancelled = true
    }
  }, [username])

  return (
    <div className="insta">
      <div className="layout profile-open">
        <InstaSidebar />

        <main className="profile-page">
          {loading && <p role="status">Loading Instagram data…</p>}
          {databaseError && <p role="alert">Could not load Instagram data: {databaseError}</p>}

          {profile && !loading && (
            <>
              <ProfileHeader profile={profile} />
              <ProfileHighlights highlights={profile.highlights} />
              <PostGrid posts={posts} username={profile.username} />
              {postId && (
                <PostDetail
                  key={postId}
                  post={posts.find((post) => post.id === Number(postId))}
                  profile={profile}
                  username={profile.username}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default InstagramProfile
