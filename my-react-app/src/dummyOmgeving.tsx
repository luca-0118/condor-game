import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './dummyOmgeving.css'

function HomePage() {
  return (
    <main className="home-page">
      <div className="home-content">
        <h1>Tijdelijke hoofdpagina</h1>
        <p>dit hoort dan ig google te zijn</p> 
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
