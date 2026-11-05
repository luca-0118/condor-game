import type { SocialProfile } from '../../../../data/socialPost'

// The "berichten / volgers / volgend" counters on a profile page.
function ProfileStats({ profile }: { profile: SocialProfile }) {
  return (
    <ul className="profile-stats">
      <li>
        <strong>{profile.postCount.toLocaleString('nl-NL')}</strong> berichten
      </li>
      <li>
        <strong>{profile.followers.toLocaleString('nl-NL')}</strong> volgers
      </li>
      <li>
        <strong>{profile.following.toLocaleString('nl-NL')}</strong> volgend
      </li>
    </ul>
  )
}

export default ProfileStats
