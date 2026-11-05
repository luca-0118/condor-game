import type { SocialUser } from '../../../data/socialUser'

// Initials shown inside avatar placeholders.
function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

// Round avatar: the user's picture when available, otherwise their initials.
function Avatar({ user, className = 'avatar' }: { user: SocialUser; className?: string }) {
  return (
    <div className={className}>
      {user.avatar ? <img src={user.avatar} alt={user.name} /> : initials(user.name)}
    </div>
  )
}

export default Avatar
