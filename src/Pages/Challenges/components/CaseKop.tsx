import { huidigeCase } from '../data'

/*
  Kop boven de inhoud: 'CASE CR-01 / ACTIEF', de titel en eventueel de opdracht.
  Gebruik: <CaseKop /> of <CaseKop metOpdracht />
*/
function CaseKop({ metOpdracht = false }: { metOpdracht?: boolean }) {
  return (
    <div className="ch-casekop">
      <p className="ch-casekop-code">CASE {huidigeCase.code} / ACTIEF</p>
      <h1>{huidigeCase.titel}</h1>
      {metOpdracht && <p className="ch-casekop-opdracht">{huidigeCase.opdracht}</p>}
    </div>
  )
}

export default CaseKop
