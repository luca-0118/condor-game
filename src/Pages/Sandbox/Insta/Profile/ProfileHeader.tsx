import { useState } from 'react'
import { Link } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import VerifiedIcon from '@mui/icons-material/Verified'
import type { SocialProfile } from '../../../../data/socialPost'
import { getSearchUrl } from '../../../../utils/search'
import Avatar from '../Avatar'
import ProfileStats from './ProfileStats'

type ProfileHeaderProps = {
  profile: SocialProfile
  // false (default): visitor view with Volgen/Bericht buttons, like when you
  // open someone's profile from search. true: your own profile.
  isOwnProfile?: boolean
}

// Top of the profile page: avatar with story ring, username, stats, bio,
// the "Gevolgd door ..." row and the action buttons below.
function ProfileHeader({ profile, isOwnProfile = false }: ProfileHeaderProps) {
  const [following, setFollowing] = useState(false)
  const [firstFollower, secondFollower] = profile.followedBy

  return (
    <header className="profile-header">
      <div className="profile-avatar">
        <div className="profile-pic-ring">
          <Avatar user={profile} className="avatar profile-pic" />
        </div>
      </div>

      <div className="profile-info">
        <div className="profile-title">
          <h2>{profile.username}</h2>
          {profile.verified && <VerifiedIcon className="verified" aria-label="Geverifieerd" />}
          <button type="button" className="profile-more" aria-label="Meer opties">
            <MoreHorizIcon aria-hidden="true" />
          </button>
        </div>

        <strong className="profile-name">{profile.name}</strong>

        <ProfileStats profile={profile} />

        <div className="profile-bio">
          {profile.category && <p className="profile-category">{profile.category}</p>}
          <p>{profile.bio}</p>
          {profile.website && (
            <Link to={getSearchUrl(profile.website)}>
              🔗 {profile.website}
            </Link>
          )}
        </div>

        {firstFollower && (
          <div className="profile-followed-by">
            <span className="profile-followed-by-avatars" aria-hidden="true">
              {profile.followedBy.map((follower) => (
                <Avatar key={follower.id} user={follower} />
              ))}
            </span>
            <span>
              Gevolgd door <strong>{firstFollower.username}</strong>
              {secondFollower && (
                <>
                  {' '}
                  en <strong>{secondFollower.username}</strong>
                </>
              )}
            </span>
          </div>
        )}
      </div>

      <div className="profile-actions">
        {isOwnProfile ? (
          <>
            <button type="button">Profiel bewerken</button>
            <button type="button">Archief bekijken</button>
          </>
        ) : (
          <>
            <button
              type="button"
              className={following ? undefined : 'follow'}
              onClick={() => setFollowing(!following)}
              aria-pressed={following}
            >
              {following ? (
                <>
                  Volgend <KeyboardArrowDownIcon aria-hidden="true" />
                </>
              ) : (
                'Volgen'
              )}
            </button>
            <button type="button">Chatbericht sturen</button>
          </>
        )}
      </div>
    </header>
  )
}

export default ProfileHeader
