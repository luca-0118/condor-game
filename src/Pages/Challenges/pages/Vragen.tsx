import { huidigeCase } from '../data'
import { plaatje } from '../hulp'
import CaseKop from '../components/CaseKop'
import TerugKnop from '../components/TerugKnop'
import VraagVeld from '../components/VraagVeld'
import { useSessie } from '../sessie/sessieContext'

/*
  Figma: MacBook Air - 5. Politierapport links, vragen van het huidige hoofdstuk rechts.
  Welke vragen er staan komt uit data.ts, dus voor een nieuw hoofdstuk hoef je hier niets te veranderen.
*/
function Vragen() {
  const { hoofdstuk, zetHoofdstuk, goed } = useSessie()
  const hoofdstukIndex = huidigeCase.hoofdstukken.findIndex((h) => h.nummer === hoofdstuk)
  const vragen = huidigeCase.hoofdstukken[hoofdstukIndex]?.vragen ?? []
  const startNummer = huidigeCase.hoofdstukken
    .slice(0, hoofdstukIndex)
    .reduce((totaal, h) => totaal + h.vragen.length, 0)
  const aantalGoed = vragen.filter((v) => v.id in goed).length
  const allesGoed = aantalGoed === vragen.length
  const volgendHoofdstuk = huidigeCase.hoofdstukken[hoofdstukIndex + 1]
  const rapport = plaatje('politierapport.webp')

  return (
    // ch-past-scherm: op een laptop of groter past deze pagina precies in het scherm, zonder scrollen
    <section className="ch-inhoud ch-past-scherm">
      <div className="ch-pagina ch-pagina-breed">
        <TerugKnop naar="/challenge/case">Terug naar de case</TerugKnop>
        <CaseKop />
        <div className="ch-vragen-raster">
          {/* Klikken opent het rapport groot in een nieuw tabblad, zodat je het goed kunt lezen */}
          <figure className="ch-rapport">
            <a href={rapport} target="_blank" rel="noreferrer">
              <img src={rapport} alt="Politierapport van de case. Klik om groot te openen." />
            </a>
            <figcaption>Klik op het rapport om het groot te openen</figcaption>
          </figure>
          <div className="ch-vragen-kolom">
            <div className="ch-vragen">
              <p className="ch-vragen-teller">
                HOOFDSTUK {hoofdstuk} · {aantalGoed} VAN {vragen.length} OPGELOST
              </p>
              {vragen.map((v, i) => (
                <VraagVeld key={v.id} vraag={v} nummer={startNummer + i + 1} />
              ))}
            </div>
            <div className="ch-onderbalk">
              {allesGoed && volgendHoofdstuk && <p className="ch-goed">Alle vragen goed.</p>}
              <button
                type="button"
                className="ch-volgende"
                disabled={!allesGoed || !volgendHoofdstuk}
                onClick={() => {
                  if (volgendHoofdstuk) zetHoofdstuk(volgendHoofdstuk.nummer)
                }}
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Vragen
