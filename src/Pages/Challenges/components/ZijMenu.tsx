import { NavLink } from 'react-router-dom'

/*
  Menu links op het case-scherm. Items zonder 'naar' bestaan nog niet en staan uitgeschakeld.
  Een nieuw onderdeel toevoegen? Zet het in deze lijst.
*/
const groepen = [
  [
    { tekst: 'OVERZICHT', naar: '/challenge/case' },
    { tekst: 'POLICE RAPPORT', naar: '/challenge/vragen' },
  ],
  [
    { tekst: 'PUZZELS', naar: '/challenge/vragen' },
    { tekst: 'HINTS' },
  ],
  [{ tekst: 'SCOREBOARD' }],
]

function ZijMenu() {
  return (
    <nav className="ch-zijmenu" aria-label="Case-menu">
      {groepen.map((groep, i) => (
        <ul key={i}>
          {groep.map((item) => (
            <li key={item.tekst}>
              {item.naar ? (
                // NavLink geeft de link van de huidige pagina vanzelf de klasse 'active'
                <NavLink to={item.naar} end>
                  {item.tekst}
                </NavLink>
              ) : (
                <span aria-disabled="true" title="Komt nog">
                  {item.tekst}
                </span>
              )}
            </li>
          ))}
        </ul>
      ))}
    </nav>
  )
}

export default ZijMenu
