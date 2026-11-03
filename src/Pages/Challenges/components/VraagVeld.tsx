import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Vraag } from '../data'
import { isGoed } from '../hulp'
import { useSessie } from '../sessie/sessieContext'

/*
  Eén vraag met invulveld, een check-knop en een hint die je kunt openklappen.
  Is het antwoord goed, dan gaat dat naar de sessie (score en voortgang lopen op) en zit het veld vast.
  Gebruik: <VraagVeld vraag={vraag} nummer={1} />
*/
function VraagVeld({ vraag, nummer }: { vraag: Vraag; nummer: number }) {
  const { goed, vraagGoed } = useSessie()
  // Is de vraag al eerder goed beantwoord? Dan begint het veld met dat antwoord uit de sessie.
  const [antwoord, zetAntwoord] = useState(goed[vraag.id] ?? '')
  const [fout, zetFout] = useState(false)
  const [hintOpen, zetHintOpen] = useState(false)
  const opgelost = vraag.id in goed
  const veldId = `vraag-${vraag.id}`

  const check = (e: FormEvent) => {
    e.preventDefault()
    if (isGoed(antwoord, vraag.antwoorden)) {
      vraagGoed(vraag.id, antwoord.trim())
      zetFout(false)
    } else {
      zetFout(true)
    }
  }

  return (
    <form className="ch-vraag" onSubmit={check}>
      <label htmlFor={veldId}>
        {nummer}. {vraag.vraag}
      </label>
      <div className="ch-vraag-rij">
        <input
          id={veldId}
          value={antwoord}
          onChange={(e) => {
            zetAntwoord(e.target.value)
            zetFout(false)
          }}
          disabled={opgelost}
          autoComplete="off"
          aria-invalid={fout}
          aria-describedby={`${veldId}-melding`}
        />
        <button type="submit" disabled={opgelost || antwoord.trim() === ''}>
          {opgelost ? 'correct' : 'check'}
        </button>
      </div>
      <div className="ch-vraag-onder">
        <button type="button" className="ch-hintknop" onClick={() => zetHintOpen((o) => !o)} aria-expanded={hintOpen}>
          Hint
        </button>
        {hintOpen && <span className="ch-hint">{vraag.hint}</span>}
        {/* aria-live zorgt dat een schermlezer 'goed' of 'fout' voorleest zodra het verschijnt */}
        <span id={`${veldId}-melding`} className="ch-melding" aria-live="polite">
          {opgelost && <span className="ch-goed">+{vraag.punten} punten</span>}
          {fout && <span className="ch-fout">Are you sure? Try again.</span>}
        </span>
      </div>
    </form>
  )
}

export default VraagVeld
