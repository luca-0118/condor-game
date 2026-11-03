import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DummyOmgeving from './dummyOmgeving'
import GameOverlay from './GameOverlay'
import Challenges from './Pages/Challenges/Challenges'
import './App.css'

function GameLayout() {
  return (
    <div className="game-layout">
      <GameOverlay />
      <main className="game-content">
        <DummyOmgeving />
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* De challenges vullen het hele scherm, zonder de sidebar van de sandbox */}
        <Route path="/challenge/*" element={<Challenges />} />
        <Route path="/sandbox/*" element={<GameLayout />} />
        <Route path="*" element={<Challenges />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
