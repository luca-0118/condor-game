import { SPEL } from '../data'
import { plaatje } from '../hulp'

/*
  Het wolvenlogo met de spelnaam eronder (groot, op het startscherm) of ernaast (klein, in de balk).
  Gebruik: <Logo groot /> of <Logo />
*/
function Logo({ groot = false }: { groot?: boolean }) {
  return (
    <div className={groot ? 'ch-logo ch-logo-groot' : 'ch-logo'}>
      <img src={plaatje('logo.png')} alt="" />
      {groot ? (
        <>
          <p className="ch-platform">{SPEL.platform}</p>
          <h1>
            <span>{SPEL.naam}</span>
            <strong>{SPEL.ondertitel}</strong>
          </h1>
          <p className="ch-classificatie">{SPEL.classificatie}</p>
        </>
      ) : (
        <p>
          <span>{SPEL.naam}</span>
          <strong>{SPEL.ondertitel}</strong>
        </p>
      )}
    </div>
  )
}

export default Logo
