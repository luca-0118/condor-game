import { Link } from 'react-router-dom'
import { huidigeCase } from '../data'
import { icoon } from '../hulp'
import CaseKop from '../components/CaseKop'
import TerugKnop from '../components/TerugKnop'
import ZijMenu from '../components/ZijMenu'

/*
  Figma: MacBook Air - 2. Uitleg van de case met een video.
  De video bestaat nog niet. Zodra die er is: zet het bestand in assets en vervang het
  blok 'ch-video' door <video controls src={...} />.
*/
function CaseIntro() {
  return (
    <div className="ch-met-menu">
      <ZijMenu />
      <section className="ch-inhoud">
        <div className="ch-pagina">
          <TerugKnop naar="/challenge/kies">Terug naar de keuze</TerugKnop>
          <CaseKop metOpdracht />
          <div className="ch-video">
            <div className="ch-video-titel">
              <p className="ch-casekop-code">CASE {huidigeCase.code} / ACTIEF</p>
              <p>{huidigeCase.titel}</p>
            </div>
            <p className="ch-video-leeg">Video volgt</p>
            <Link to="/challenge/vragen" className="ch-rapportknop">
              OPEN POLICE REPORT
              <img src={icoon('pijl')} alt="" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CaseIntro
