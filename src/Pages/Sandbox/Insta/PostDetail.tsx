import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { getSearchUrl } from '../../../utils/search'
import type { SocialComment, SocialPost, SocialProfile } from '../../../data/socialPost'
import Avatar from './Avatar'
import { loadInstagramPostComments } from '../Databases/instagramDatabase'

type PostDetailProps = {
  post: SocialPost | undefined
  profile: SocialProfile
  username: string
}

function PostDetail({ post, profile, username }: PostDetailProps) {
  const [comments, setComments] = useState<SocialComment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    if (!post) {
      return
    }

    loadInstagramPostComments(post.id).then(
      (loadedComments) => {
        if (active) {
          setComments(loadedComments)
          setLoading(false)
        }
      },
      (reason: unknown) => {
        if (active) {
          setError(reason instanceof Error ? reason.message : 'An unknown database error occurred.')
          setLoading(false)
        }
      },
    )

    return () => {
      active = false
    }
  }, [post])

  return (
    <div className="post-detail-backdrop">
      <section className="post-detail" role="dialog" aria-modal="true" aria-label="Bericht">
        <Link
          className="post-detail-close"
          to={`/sandbox/instagram/profile/${username}`}
          aria-label="Bericht sluiten"
        >
          ×
        </Link>

        {!post ? (
          <p role="alert">Dit bericht bestaat niet.</p>
        ) : (
          <>
            <div className="post-detail-media">
              {post.media[0] && (
                <img src={post.media[0].url} alt={post.media[0].alt ?? post.caption} />
              )}
            </div>
            <div className="post-detail-content">
              <header className="post-detail-header">
                <Avatar user={profile} />
                <strong>{profile.username}</strong>
                <MoreHorizIcon aria-hidden="true" />
              </header>

              <div className="post-detail-comments">
                <div className="post-detail-caption">
                  <Avatar user={profile} />
                  <p><strong>{profile.username}</strong> {post.caption}</p>
                </div>
                {loading && <p role="status">Comments laden…</p>}
                {error && <p role="alert">Comments konden niet worden geladen: {error}</p>}
                {!loading && !error && comments.map((comment) => (
                  <div className="post-detail-comment" key={comment.id}>
                    <Avatar user={comment.user} />
                    <p><strong>{comment.user.username}</strong> {comment.text}</p>
                  </div>
                ))}
                {!loading && !error && comments.length === 0 && (
                  <p className="post-detail-empty">Nog geen comments.</p>
                )}
              </div>

              <footer className="post-detail-footer">
                <div className="post-detail-likes">
                  <FavoriteBorderOutlinedIcon aria-hidden="true" />
                  <strong>{post.likeCount.toLocaleString('nl-NL')} likes</strong>
                </div>
                <time dateTime={post.postedAt}>{new Date(post.postedAt).toLocaleDateString('nl-NL')}</time>
                {profile.website && (
                  <Link to={getSearchUrl(profile.website)}>Website: {profile.website}</Link>
                )}
              </footer>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default PostDetail
