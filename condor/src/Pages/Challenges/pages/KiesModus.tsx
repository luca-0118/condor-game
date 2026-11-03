import KeuzeTegel from '../components/KeuzeTegel'
import Logo from '../components/Logo'
import StartLayout from '../components/StartLayout'
import TerugKnop from '../components/TerugKnop'
import { useSessie } from '../sessie/sessieContext'

/*
  Na START kies je wat je gaat doen. Vragen en sandbox zijn bewust twee losse onderdelen:
  in een team kan de een de vragen beantwoorden terwijl de ander in de sandbox zoekt.
  Beide starten dezelfde sessie, zodat de timer meteen loopt.
  Let op: de sandbox staat nu nog buiten de SessieProvider. Met een backend delen ze de sessie via de server.
*/
function KiesModus() {
  const { startSessie } = useSessie()
  return (
    <StartLayout>
      <Logo groot />
      <div className="ch-tegels">
        <KeuzeTegel
          nummer="01"
          icoonNaam="dossier"
          titel="CASE EN VRAGEN"
          uitleg="Lees het dossier en beantwoord de vragen met je team."
          naar="/challenge/case"
          bijKlik={startSessie}
        />
        <KeuzeTegel
          nummer="02"
          icoonNaam="zoek"
          titel="SANDBOX"
          uitleg="Zoek zelf naar sporen op social media en websites."
          naar="/"
          bijKlik={startSessie}
        />
      </div>
      <TerugKnop naar="/challenge">Terug naar het menu</TerugKnop>
    </StartLayout>
  )
}

export default KiesModus
