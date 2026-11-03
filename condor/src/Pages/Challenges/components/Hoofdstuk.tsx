import { useSessie } from '../sessie/sessieContext'

/*
  Klein groen label met het huidige hoofdstuk, bijvoorbeeld 'CH 01'.
  Bryan vond de hoofdstukken in het dashboard te druk (opmerking in Figma), daarom is dit
  bewust een rustig label zonder kader. Wil het team iets anders, dan pas je alleen dit bestand aan.
*/
function Hoofdstuk() {
  const { hoofdstuk } = useSessie()
  return <span className="ch-hoofdstuk">CH {String(hoofdstuk).padStart(2, '0')}</span>
}

export default Hoofdstuk
