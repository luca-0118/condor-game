import { useState, type MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import VerifiedIcon from '@mui/icons-material/Verified'
import type { SocialProfile } from '../../../../data/socialPost'
import { getSearchUrl } from '../../../../utils/search'
import { findBrowserSiteByDomain } from '../../Databases/googleDatabase'
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
  const [websiteError, setWebsiteError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [firstFollower, secondFollower] = profile.followedBy

  const handleWebsiteClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    const website = profile.website
    if (!website) return

    event.preventDefault()
    setWebsiteError(null)

    let url: URL
    try {
      url = new URL(
        /^https?:\/\//i.test(website) ? website : `https://${website}`,
      )
    } catch {
      void navigate(getSearchUrl(website))
      return
    }

    try {
      const site = await findBrowserSiteByDomain(url.hostname)
      if (site?.route.startsWith('/')) {
        const path = url.pathname === '/' ? '' : url.pathname
        void navigate(`${site.route}${path}${url.search}${url.hash}`)
        return
      }

      void navigate(getSearchUrl(website))
    } catch (error) {
      console.error('Failed to resolve the profile website in the sandbox.', error)
      setWebsiteError('Could not open this website in the sandbox.')
    }
  }

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
            <Link
              to={getSearchUrl(profile.website)}
              onClick={(event) => void handleWebsiteClick(event)}
            >
              🔗 {profile.website}
            </Link>
          )}
          {websiteError && <p role="alert">{websiteError}</p>}
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
