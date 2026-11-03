import Logo from '../components/Logo'
import MenuKnop from '../components/MenuKnop'
import StartLayout from '../components/StartLayout'

/* Figma: MacBook Air - 1. Het eerste scherm. Settings en scorebord bestaan nog niet en staan uit. */
function Startscherm() {
  return (
    <StartLayout>
      <Logo groot />
      <div className="ch-menu">
        <MenuKnop icoonNaam="play" naar="/kies" opvallend>
          START
        </MenuKnop>
        <MenuKnop icoonNaam="instellingen">SETTINGS</MenuKnop>
        <MenuKnop icoonNaam="vuur">SCOREBORD</MenuKnop>
      </div>
    </StartLayout>
  )
}

export default Startscherm
