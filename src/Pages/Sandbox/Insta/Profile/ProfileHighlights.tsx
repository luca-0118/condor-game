import AddIcon from '@mui/icons-material/Add'
import type { SocialHighlight } from '../../../../data/socialPost'

type ProfileHighlightsProps = {
  highlights: SocialHighlight[]
  // Show the "Nieuw" button; only your own profile has it.
  showNew?: boolean
}

// Story highlight circles, optionally starting with the "Nieuw" (new) button.
function ProfileHighlights({ highlights, showNew = false }: ProfileHighlightsProps) {
  return (
    <div className="profile-highlights">
      {showNew && (
        <div className="highlight">
          <div className="highlight-ring new">
            <AddIcon aria-label="Nieuw" />
          </div>
          <p>Nieuw</p>
        </div>
      )}

      {highlights.map((highlight) => (
        <div className="highlight" key={highlight.id}>
          <div className="highlight-ring">
            {highlight.coverUrl && <img src={highlight.coverUrl} alt={highlight.title} />}
          </div>
          <p>{highlight.title}</p>
        </div>
      ))}
    </div>
  )
}

export default ProfileHighlights
