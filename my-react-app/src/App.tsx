import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DummyOmgeving from './dummyOmgeving'
import GameOverlay from './GameOverlay'
import Instagram from './Pages/Insta/Instagram'
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
        <Route path="/instagram" element={<Instagram />} />
        <Route path="*" element={<GameLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
