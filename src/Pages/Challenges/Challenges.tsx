import { Outlet, Route, Routes } from 'react-router-dom'
import SessieProvider from './sessie/SessieProvider'
import SpelBalk from './components/SpelBalk'
import Startscherm from './pages/Startscherm'
import KiesModus from './pages/KiesModus'
import CaseIntro from './pages/CaseIntro'
import Vragen from './pages/Vragen'
import './challenges.css'

/*
  Ingang van de challenges, te vinden op /challenge.
  SessieProvider staat om alles heen, zodat score, voortgang en timer blijven staan als je
  tussen de schermen wisselt.

  Schermen (naam in Figma tussen haakjes):
    /challenge          Startscherm (MacBook Air - 1)
    /challenge/kies     Keuze tussen vragen en sandbox (zelfde opbouw als Air - 1)
    /challenge/case     Uitleg van de case met video (MacBook Air - 2)
    /challenge/vragen   Politierapport en vragen (MacBook Air - 5)
*/

// Schermen tijdens het spel krijgen de balk met timer en score. <Outlet /> is de plek waar het scherm komt.
function SpelLayout() {
  return (
    <>
      <SpelBalk />
      <Outlet />
    </>
  )
}

function Challenges() {
  return (
    <SessieProvider>
      <div className="ch">
        <Routes>
          <Route index element={<Startscherm />} />
          <Route path="kies" element={<KiesModus />} />
          <Route element={<SpelLayout />}>
            <Route path="case" element={<CaseIntro />} />
            <Route path="vragen" element={<Vragen />} />
          </Route>
        </Routes>
      </div>
    </SessieProvider>
  )
}

export default Challenges
