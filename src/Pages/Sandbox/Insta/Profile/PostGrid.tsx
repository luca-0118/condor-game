import FavoriteIcon from '@mui/icons-material/Favorite'
import GridOnIcon from '@mui/icons-material/GridOn'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined'
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined'
import { Link } from 'react-router-dom'
import type { SocialPost } from '../../../../data/socialPost'

// One tile in the grid; hovering shows the like and comment counts.
function PostTile({ post, username }: { post: SocialPost; username: string }) {
  const cover = post.media[0]

  return (
    <Link
      className="post-tile post-tile-link"
      to={`/sandbox/instagram/profile/${username}/post/${post.id}`}
      aria-label={`Bericht openen: ${post.caption}`}
    >
      {cover ? (
        <img src={cover.url} alt={cover.alt ?? post.caption} />
      ) : (
        <div className="post-tile-placeholder" />
      )}
      <div className="post-tile-overlay">
        <span>
          <FavoriteIcon aria-hidden="true" /> {post.likeCount.toLocaleString('nl-NL')}
        </span>
        <span>
          <ModeCommentIcon aria-hidden="true" /> {post.commentCount.toLocaleString('nl-NL')}
        </span>
      </div>
    </Link>
  )
}

// Tab bar plus the 3-column photo grid, like on an Instagram profile.
function PostGrid({ posts, username }: { posts: SocialPost[]; username: string }) {
  return (
    <section className="profile-posts">
      <div className="profile-tabs">
        <button type="button" className="active" aria-label="Berichten">
          <GridOnIcon aria-hidden="true" />
        </button>
        <button type="button" aria-label="Reels">
          <SmartDisplayOutlinedIcon aria-hidden="true" />
        </button>
        <button type="button" aria-label="Getagd">
          <PersonPinOutlinedIcon aria-hidden="true" />
        </button>
      </div>

      <div className="post-grid">
        {posts.map((post) => <PostTile key={post.id} post={post} username={username} />)}
      </div>
    </section>
  )
}

export default PostGrid
