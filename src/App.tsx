import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DummyOmgeving from './Pages/Sandbox/dummyOmgeving'
import GameOverlay from './Pages/Sandbox/GameOverlay'
import Challenges from './Pages/Challenges/Challenges'
import AdminPage from './Pages/Admin/Admin_SocialPage'
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
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/challenge/*" element={<Challenges />} />
        <Route path="/sandbox/*" element={<GameLayout />} />
        <Route path="*" element={<Challenges />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
